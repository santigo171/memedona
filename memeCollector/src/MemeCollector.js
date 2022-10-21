import { postMemes } from "./apiRequests.js";

class MemeCollector {
  #MAX_MEMES_TO_BE_INSERTED = 1;
  #MAX_INSERTED_MEMES_URL = 20;

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
    throw new Error("No destroy function");
  }

  run() {
    throw new Error("No run function");
  }

  collectMeme({ sourceId, type, url }) {
    console.log("New meme");
    console.log(` Inserted memes: ${this.insertedMemesUrl}`);

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
      console.log("Meme sent");
      if (this.collectedMemes.length >= this.#MAX_MEMES_TO_BE_INSERTED)
        this.#insertCollectedMemes();
    }
  }

  #insertCollectedMemes() {
    postMemes(this.collectedMemes);
    this.collectedMemes = [];
  }
}

export { MemeCollector };
