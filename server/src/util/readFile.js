import * as fs from "fs";
import * as path from "path";

function readFile(_path) {
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(_path);
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });
}

export { readFile };
