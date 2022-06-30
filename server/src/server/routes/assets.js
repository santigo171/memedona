import * as fs from "fs";

import path from "path";
const __dirname = path.resolve();

import express from "express";
const router = express.Router();

import * as cors from "cors";

const isChildOf = (child, parent) => {
  const relative = path.relative(parent, child);
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
};

async function sendFile(req, res, next, folderName) {
  const filePath = req.params.filePath;
  const fullfilePath = path.resolve(
    `${__dirname}/assets/${folderName}/${filePath}`
  );
  const workingDirectoryPath = __dirname;

  if (!isChildOf(fullfilePath, workingDirectoryPath))
    return res.status(400).send({
      message: "File can't be outside folder",
    });

  fs.readFile(fullfilePath, (err, data) => {
    if (err?.code == "ENOENT")
      return res.status(404).send({ message: "File doesn't exits" });
    res.status(200).send(data);
  });
}

router.use(
  cors.default({
    origin: "*",
  })
);

router.get("/", (req, res) => {
  res.status(400).send({ message: "Must specify a folder" });
});

router.get("/brands/:filePath", (req, res, next) =>
  sendFile(req, res, next, "brands")
);

router.get("/topics/:filePath", (req, res, next) =>
  sendFile(req, res, next, "topics")
);

router.get("/collectors/:filePath", (req, res, next) =>
  sendFile(req, res, next, "collectors")
);

export { router };
