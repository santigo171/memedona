import { postMeme } from "./apiRequests.js";

class MemeCollector {
  #MAX_INSERTED_MEMES_URL = 20;

  constructor({ collector, collectorIdInDb }) {
    this.collector = collector;
    this.collectorIdInDb = collectorIdInDb;
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

  collectMeme({ sourceId, type, url, topicId }) {
    console.log("\n\nAlready inserted urls: ");
    console.table(this.insertedMemesUrl);

    if (this.insertedMemesUrl.includes(url)) {
      return console.log("Repeated meme, wasn't inserted");
    } else {
      console.log("Valid meme to insert");
      this.insertedMemesUrl.push(url);
      if (this.insertedMemesUrl.length > this.#MAX_INSERTED_MEMES_URL)
        this.insertedMemesUrl = [];
      if (topicId) {
        postMeme({ "source-id": sourceId, type, url, "topic-id": topicId });
      } else {
        postMeme({ "source-id": sourceId, type, url });
      }
    }
  }
}

export { MemeCollector };
