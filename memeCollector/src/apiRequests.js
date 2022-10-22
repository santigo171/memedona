import { config as dotenvConfig } from "dotenv";
dotenvConfig();

import { default as axios } from "axios";

const COLLECTORS_PASSWORD = process.env.COLLECTORS_PASSWORD;

function getSources(collectorIdInDb) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios({
        method: "get",
        url: `https://memedonaapi.herokuapp.com/v1/sources/${collectorIdInDb}`,
        headers: {
          password: COLLECTORS_PASSWORD,
        },
      });
      resolve(res.data);
    } catch (err) {
      reject(err);
    }
  });
}

async function postMeme(meme) {
  try {
    const res = await axios({
      method: "post",
      url: "https://memedonaapi.herokuapp.com/v1/memes",
      headers: {
        password: COLLECTORS_PASSWORD,
      },
      data: meme,
    });
    console.log(`Meme inserted successfully: ` + meme);
    console.log(res.data);
  } catch (err) {
    console.dir(err, { depth: 10 });
  }
}

export { getSources, postMeme };
