// discord.js
import { Client } from "discord.js";

// classes and functions
import { MemeCollector } from "../MemeCollector.js";
import { getFileType } from "../util/getFileType.js";
import { db } from "../Database.js";

class DiscordCollector extends MemeCollector {
  #client;
  #memesChannelsIds;
  #sources;
  #TOKEN_ARRAY;
  #currentTokenIndex = 0;

  constructor({ tokenArray, collectorIdInDb }) {
    super({ collector: "discord", collectorIdInDb });
    this.#TOKEN_ARRAY = tokenArray;
    this.collectedMemes = [];
  }

  #login(token) {
    return new Promise((resolve) => {
      let client = new Client({ _tokenType: "" });
      client.login(token);
      client.once("ready", () => {
        console.log("logged has " + client.user.username);
        resolve(client);
      });
    });
  }

  #getMemesChannelsIds() {
    return new Promise(async (resolve) => {
      this.#sources = await db.fetchSources(this.collectorIdInDb);
      const memesChannelsIds = this.#sources.flatMap((source) =>
        source.url_start.substring(0, source.url_start.length - 1)
      );

      resolve(memesChannelsIds);
    });
  }

  #getSourceByChannelId(channelId) {
    return this.#sources.filter(
      (source) => source.url_start == `${channelId}/`
    )[0];
  }

  setUp() {
    return new Promise(async (resolve) => {
      console.log(`Setting Up ${this.collector}`);
      const client = await this.#login(
        this.#TOKEN_ARRAY[this.#currentTokenIndex]
      );
      const memesChannelsIds = await this.#getMemesChannelsIds();

      await Promise.all([client, memesChannelsIds]);

      this.#client = client;
      this.#memesChannelsIds = memesChannelsIds;
      resolve();
    });
  }

  async destroy() {
    await this.#client.destroy();
    console.log(`Destroyed ${this.collector}`);
    this.#currentTokenIndex =
      this.#currentTokenIndex + 1 >= this.#TOKEN_ARRAY.length
        ? 0
        : this.#currentTokenIndex + 1;
  }

  run() {
    console.log(`Running ${this.collector}`);
    this.#client.on("message", (message) => {
      if (!this.#memesChannelsIds.includes(message.channel.id)) return;
      if (!!message.author.bot) return;

      const messageAttachments = Array.from(message.attachments);
      if (!messageAttachments.length > 0) return;

      messageAttachments.forEach((rawAttachment) => {
        // get url
        const { attachment: attachmentUrl } = rawAttachment[1];
        const url = attachmentUrl.split("/").slice(-2).join("/");
        // get type
        let type;
        try {
          type = getFileType(attachmentUrl);
        } catch (err) {
          return console.error(err);
        }
        // get sourceId
        const { id: sourceId } = this.#getSourceByChannelId(message.channel.id);
        // collect
        this.collectMeme({
          url,
          type,
          sourceId,
        });
      });
    });
  }
}

export { DiscordCollector };
