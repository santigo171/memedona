import express from "express";
const router = express.Router();

import { db } from "../../Database.js";

const brandsSqlSelect = `select start_date as startDate, end_date as endDate, color, logo_url as logoUrl, id from brands`;

router.get("/", async (req, res) => {
  const brands = await db.query(`${brandsSqlSelect};`);
  res.status(200).send(brands);
});

router.post("/", async (req, res) => {
  const adminPassword = String(process.env.ADMIN_PASSWORD);
  const enteredPassword = String(req.headers.password);

  if (adminPassword !== enteredPassword)
    return res.status(401).send({ message: "Unauthorized" });

  const startDate = req.body["start-date"];
  const endDate = req.body["end-date"];
  const color = req.body["color"];
  const logoUrl = req.body["logo-url"];

  if (startDate || endDate || color || logoUrl) {
    if (!(startDate && endDate && color && logoUrl)) {
      return res.status(400).send({
        message: "body must have: start-date, end-date, color, logo-url",
      });
    }
  } else {
    return res.status(400).send({
      message: "body must have: start-date, end-date, color, logo-url",
    });
  }

  const formatedStartDate = new Date(startDate);
  const formatedEndDate = new Date(endDate);

  if (formatedStartDate == "Invalid date" || formatedEndDate == "Invalid date")
    return res
      .status(400)
      .send({ message: "dates must be send in YYYY/MM/DD format" });

  const newBrandSql = `insert into brands (start_date, end_date, color, logo_url)
  values ("${startDate}", "${endDate}", "${color}", "${logoUrl}")
  `;
  try {
    const dbRes = await db.query(newBrandSql);
    res.status(201).send({ message: dbRes });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  const adminPassword = String(process.env.ADMIN_PASSWORD);
  const enteredPassword = String(req.headers["password"]);

  if (adminPassword !== enteredPassword)
    return res.status(401).send({ message: "Unauthorized" });

  const id = req.params.id;

  if (!id) return res.status(400).send({ message: "Must send an Id" });

  const fetchBrandSql = `select * from brands where brands.id = ${id}`;

  const brand = db.query(fetchBrandSql);
  if (!brand)
    return res.status(400).send({ message: `Brand with ${id} doesn't exits` });

  const deleteBrandSql = `delete from brands where brands.id = ${id}`;
  const brandRes = db.query(deleteBrandSql);

  res.status(202).send({ message: brandRes });
});

router.get("/current", async (req, res) => {
  const brands = await db.query(
    `${brandsSqlSelect}
    where now() between brands.start_date and brands.end_date
    order by brands.end_date
    limit 1;`
  );

  if (brands.length > 0) {
    res.status(200).send(brands[0]);
  } else {
    res.status(404).send({ message: "No current brand found" });
  }
});

export { router };
