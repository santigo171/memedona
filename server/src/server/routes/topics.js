import express from "express";
const router = express.Router();

import { db } from "../../Database.js";

router.get("/", async (req, res) => {
  const topics = await db.query(
    `select id, name, logo_url as logoUrl, color from topics where active = 1`
  );
  res.status(200).send(topics);
});

export { router };
