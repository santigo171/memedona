// dotenv
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

// Modules
import { DiscordCollector } from "./MemeCollectors/DiscordCollector.js";
import { db } from "./Database.js";
import { server } from "./server/server.js";

class Api {
  #collectors;
  #dbCredentials;
  #serverCredentials;

  constructor(collectors, dbCredentials, serverCredentials) {
    this.#collectors = collectors;
    this.#dbCredentials = dbCredentials;
    this.#serverCredentials = serverCredentials;
  }

  async runDb() {
    await db.setUp(this.#dbCredentials);
    console.log("db running");
  }

  async runCollectors() {
    this.#collectors.forEach(async (collector) => {
      const runningCollector = new collector.collector(collector.settings);
      await runningCollector.setUp();
      runningCollector.run();
      console.log("collector running");
    });
  }

  async runRestApi() {
    server.setUp(this.#serverCredentials);
    await server.run();
    console.log("server running");
  }

  run() {
    this.runDb();
    this.runCollectors();
    this.runRestApi();
  }
}

const collectors = [
  {
    collector: DiscordCollector,
    settings: {
      token: process.env.DISCORD_TOKEN,
      collectorIdInDb: process.env.DISCORD_ID_IN_DB,
    },
  },
];

const dbCredentials = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const serverCredentials = {
  port: process.env.SERVER_PORT || 5000,
  corsWhitelist: ["http://localhost:3000", "https://localhost:5000"],
};

const api = new Api(collectors, dbCredentials, serverCredentials);
api.run();

process.on("uncaughtException", (err) => {
  console.log(err);
  api.runCollectors();
});
