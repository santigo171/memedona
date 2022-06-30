import { db } from "./Database.js";

class MemeCollector {
  #MAX_MEMES_TO_BE_INSERTED = 1;

  constructor({ collector, collectorIdInDb }) {
    this.collector = collector;
    this.collectorIdInDb = collectorIdInDb;
    this.collectedMemes = [];
  }

  setUp() {
    throw new Error("No setUp function");
  }

  run() {
    throw new Error("No run function");
  }

  collectMeme({ sourceId, type, url }) {
    console.log("New meme");
    this.collectedMemes.push({
      url,
      type,
      sourceId,
    });

    if (this.collectedMemes.length >= this.#MAX_MEMES_TO_BE_INSERTED)
      this.#insertCollectedMemes();
  }

  #insertCollectedMemes() {
    db.insertMemes(this.collectedMemes);
    this.collectedMemes = [];
  }
}

export { MemeCollector };
