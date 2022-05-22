import express from "express";
const router = express.Router();

import { db } from "../../Database.js";

router.get("/", async (req, res) => {
  const collectors = await db.query(
    `select id, name, logo_url from collectors`
  );
  res.status(200).send(collectors);
});

export { router };
