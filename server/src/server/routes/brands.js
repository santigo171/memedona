import express from "express";
const router = express.Router();

import { db } from "../../Database.js";

router.get("/", async (req, res) => {
  const brands = await db.query(
    `select date_created, date_outdated, color, logo_url from brands;`
  );
  res.status(200).send(brands);
});

router.get("/current", async (req, res) => {
  const brands = await db.query(
    `select date_created, date_outdated, color, logo_url from brands
    where now() between date_created and date_outdated
    order by date_created
    limit 1;`
  );

  if (brands.length > 0) {
    res.status(200).send(brands[0]);
  } else {
    res.status(404).send({ message: "No current brand found" });
  }
});

export { router };
