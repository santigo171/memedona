import express from "express";

import { db } from "../../Database.js";
import { fullUrlMiddleware, updateQueryStringParameter } from "../server.js";

const router = express.Router();

const memesSqlSelectAndJoin = `
  select
  memes.id,
  collectors.id as collectorId,
  collectors.name as collectorName,
  sources.name as source,
  memes.likes,
  memes.shares,
  memes.likes + memes.shares as popularity,
  memes.type,
  memes.date,
  concat(collectors.url_start, sources.url_start, memes.url) as url

  from memes
  join sources on memes.source_id = sources.id
  join collectors on sources.collector_id = collectors.id
`;

router.get("/", fullUrlMiddleware, async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;

  const topicId = parseInt(req.query["topic-id"]);
  const minId = parseInt(req.query["min-id"]) || undefined;
  const maxId = parseInt(req.query["max-id"]) || undefined;
  const mostPopular = req.query["most-popular"];

  const orderBySql = mostPopular ? "popularity desc" : "date desc";

  if (minId || maxId) {
    if (!(minId && maxId))
      return res.status(400).send({
        message:
          "Error: if you send max-id, you must send min-id of vice versa",
      });
  }

  const conditionsSql = [
    topicId ? `memes.topic_id = ${topicId}` : undefined,
    maxId && minId ? `memes.id not between ${minId} and ${maxId}` : undefined,
  ].filter((e) => e !== undefined);

  const memesSql = `
  ${memesSqlSelectAndJoin}  
  ${conditionsSql.length > 0 ? "where" : ""}
  ${conditionsSql.length > 0 ? conditionsSql.join(" and ") : ""}
  order by ${orderBySql}
  limit ${limit};`;

  const memes = await db.query(memesSql);

  const resMinId = memes.reduce((reducer, item) => {
    return item.id < reducer ? (reducer = item.id) : reducer;
  }, 99999999999999);

  const resMaxId = memes.reduce((reducer, item) => {
    return item.id > reducer ? (reducer = item.id) : reducer;
  }, 0);

  let globalMinId = resMinId;
  if (minId && maxId) globalMinId = Math.min(minId, resMinId);

  let globalMaxId = resMaxId;
  if (minId && maxId) globalMaxId = Math.max(maxId, resMaxId);

  const next = updateQueryStringParameter(
    updateQueryStringParameter(req.fullUrl, "min-id", globalMinId),
    "max-id",
    globalMaxId
  );

  res.status(200).send({
    info: {
      minId: resMinId,
      maxId: resMaxId,
      globalMinId,
      globalMaxId,
      next,
    },
    results: memes,
  });
});

router.get("/:memeId", async (req, res) => {
  const { memeId } = req.params;

  const memesSql = `
  ${memesSqlSelectAndJoin}  
  where memes.id = ${memeId}`;

  const memes = await db.query(memesSql);
  res.status(200).send(memes);
});

router.get("/:memeId", async (req, res) => {
  const { memeId } = req.params;

  const memesSql = `
  ${memesSqlSelectAndJoin}  
  where memes.id = ${memeId}`;

  const memes = await db.query(memesSql);
  res.status(200).send(memes);
});

router.patch("/:memeId", async (req, res) => {
  const { memeId } = req.params;
  const likes = parseInt(req.body.likes) || 0;
  const shares = parseInt(req.body.shares) || 0;

  if (likes || shares) {
    if (likes > 1 || shares > 1) {
      return res.status(400).send({
        message: "Patch value for likes/shares must be 1",
      });
    }
  } else {
    return res.status(400).send({ message: "Not likes/shares specified" });
  }

  const memesSql = `select * from memes where id = ${memeId}`;

  const memes = await db.query(memesSql);

  if (memes.length > 0) {
    const meme = memes[0];

    const desiredLikes = (meme.likes += likes);
    const desiredShares = (meme.shares += shares);

    let patchMemeSql1 = `update memes set memes.likes = ${desiredLikes} where memes.id = ${memeId};`;
    let patchMemeSql2 = `update memes set memes.shares = ${desiredShares} where memes.id = ${memeId};`;

    const dbRes1 = await db.query(patchMemeSql1);
    const dbRes2 = await db.query(patchMemeSql2);
    res.status(200).send({ message1: dbRes1, message2: dbRes2 });
  } else {
    res
      .status(404)
      .send({ message: `Error: Meme with id ${memeId} not found` });
  }
});

export { router };
