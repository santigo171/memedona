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

function postMemes(memeArray) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`Memes to be inserted: ${memeArray}`);
      // const res = await axios({
      //   method: "post",
      //   url: "https://memedonaapi.herokuapp.com/v1/memes",
      //   headers: {
      //     password: COLLECTORS_PASSWORD,
      //   },
      //   data: {

      //   }
      // });
      // resolve(res.data);
    } catch (err) {
      console.log(err);
    }
  });
}

export { getSources, postMemes };
