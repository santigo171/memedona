import express from "express";
const router = express.Router();

import { db } from "../../Database.js";
import { collectorsPasswordMiddleware } from "../server.js";

router.get("/", async (req, res) => {
  res
    .status(400)
    .send({ message: "Must specify collectorId ex: /v1/sources/sources/1" });
});

router.get("/:collectorId", collectorsPasswordMiddleware, async (req, res) => {
  try {
    const { collectorId } = req.params;
    const sources = await db.query(
      `SELECT id, name, url_start
      FROM sources
      WHERE collector_id = ${collectorId}`
    );
    res.status(200).send(sources);
  } catch (err) {
    res.status(400).send(err);
  }
});

export { router };
