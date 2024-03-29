import express from "express";

import { db } from "../../Database.js";
import {
  fullUrlMiddleware,
  collectorsPasswordMiddleware,
  updateQueryStringParameter,
} from "../server.js";

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
  const limit = parseInt(req.query["limit"]) || 5;

  // Exclude
  let exclude;
  try {
    exclude = JSON.parse(req.query["exclude"]);
  } catch (err) {
    exclude = undefined;
  }

  let valid = true;
  if (exclude)
    exclude.forEach((item) => {
      if (!Array.isArray(item) && valid) {
        if (typeof item !== "number") {
          valid = false;
          res
            .status(400)
            .send({ message: "Error: Must send numbers in exclude parameter" });
        }
      } else if (Array.isArray(item) && valid) {
        const min = item[0];
        const max = item[1];
        if (!(min && max)) {
          valid = false;
          res.status(400).send({
            message: "Error: if you send a min value must send a max one",
          });
        } else if (typeof item[0] !== "number" || typeof item[1] !== "number") {
          valid = false;
          res.status(400).send({
            message: "Error: Must send numbers in exclude parameter",
          });
        } else if (max - min > 100) {
          valid = false;
          res.status(400).send({
            message: "Error: Excluding numbers can't be more than 100",
          });
        } else if (min > max) {
          valid = false;
          res.status(400).send({
            message:
              "Error: Min number can't be greater than max number in exclude parameter",
          });
        }
      }
    });
  if (!valid) return;

  // Topic Id
  let topicId = parseInt(req.query["topic-id"]);

  const orderBySql = topicId === 2 ? "popularity desc" : "date desc"; // If topicId is 2 (Most popular) memes will be shorted by popularity, else they will be shorted by date (No matter the topic)
  if (topicId === 1 || topicId === 2) topicId = undefined;

  // Type
  let type = req.query["type"];
  if (type !== "vid" && type !== "img") type = undefined;

  // Conditions
  const conditionsSql = [
    topicId ? `memes.topic_id = ${topicId}` : undefined,
    type ? `memes.type = "${type}"` : undefined,
    exclude
      ? exclude.map((item) => {
          if (Array.isArray(item)) {
            return `memes.id not between ${item[0]} and ${item[1]}`;
          } else {
            return `not memes.id = ${item}`;
          }
        })
      : undefined,
  ]
    .filter((e) => e !== undefined)
    .reduce((r, e) => (Array.isArray(e) ? r.push(...e) : r.push(e), r), []);

  const memesSql = `
  ${memesSqlSelectAndJoin}  
  ${conditionsSql.length > 0 ? "where" : ""}
  ${conditionsSql.length > 0 ? conditionsSql.join(" and ") : ""}
  order by ${orderBySql}
  limit ${limit};`;

  const memes = await db.query(memesSql);

  let newExclude = memes.map((meme) => meme.id);
  if (exclude) {
    newExclude = [...newExclude, ...exclude];
  }

  let next = updateQueryStringParameter(
    req.fullUrl,
    "exclude",
    JSON.stringify(newExclude)
  );
  if (topicId) next = updateQueryStringParameter(next, "topic-id", topicId);
  next = next.replace("http", "https");

  res.status(200).send({
    next,
    exclude: newExclude,
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

router.patch("/:memeId", async (req, res) => {
  const { memeId } = req.params;
  const likes = parseInt(req.body["likes"]) || 0;
  const shares = parseInt(req.body["shares"]) || 0;

  if (likes || shares) {
    if (likes > 1 || shares > 1 || likes < 0 || shares < 0) {
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

router.post("/", collectorsPasswordMiddleware, async (req, res) => {
  const type = req.body["type"];
  const sourceId = req.body["source-id"];
  const url = req.body["url"];
  const topicId = req.body["topic-id"];

  const memeSql = topicId
    ? `insert into memes (type, url, source_id, topic_id)
                   values('${type}', '${url}', ${sourceId}, ${topicId})`
    : `insert into memes (type, url, source_id)
                   values('${type}', '${url}', ${sourceId})`;

  try {
    const dbRes = await db.query(memeSql);

    res.status(201).send({
      message: dbRes,
    });
  } catch (err) {
    res.status(400).send({
      message: err,
    });
  }
});

export { router };
