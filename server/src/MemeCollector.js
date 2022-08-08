import { db } from "./Database.js";

class MemeCollector {
  #MAX_MEMES_TO_BE_INSERTED = 1;
  #MAX_INSERTED_MEMES_URL = 10;

  constructor({ collector, collectorIdInDb }) {
    this.collector = collector;
    this.collectorIdInDb = collectorIdInDb;
    this.collectedMemes = [];
    this.insertedMemesUrl = [];
  }

  setUp() {
    throw new Error("No setUp function");
  }

  destroy() {
    throw new Error("No stop function");
  }

  run() {
    throw new Error("No run function");
  }

  collectMeme({ sourceId, type, url }) {
    console.log("New meme");
    console.log(this.insertedMemesUrl);

    if (this.insertedMemesUrl.includes(url)) {
      return console.log("Repeated Meme, wasn't inserted");
    } else {
      this.insertedMemesUrl.push(url);
      if (this.insertedMemesUrl.length > this.#MAX_INSERTED_MEMES_URL)
        this.insertedMemesUrl = [];

      this.collectedMemes.push({
        url,
        type,
        sourceId,
      });

      console.log(this.collectedMemes);
      if (this.collectedMemes.length >= this.#MAX_MEMES_TO_BE_INSERTED)
        this.#insertCollectedMemes();
    }
  }

  #insertCollectedMemes() {
    db.insertMemes(this.collectedMemes);
    this.collectedMemes = [];
  }
}

export { MemeCollector };
