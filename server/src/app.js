// dotenv
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

// Modules
import { DiscordCollector } from "./MemeCollectors/DiscordCollector.js";
import { db } from "./Database.js";
import { server } from "./server/server.js";

class Api {
  #collectors;
  runningCollectors = [];

  #dbCredentials;
  #serverCredentials;

  constructor(collectors, dbCredentials, serverCredentials) {
    this.#collectors = collectors;
    this.#dbCredentials = dbCredentials;
    this.#serverCredentials = serverCredentials;
  }

  async runDb() {
    try {
      await db.setUp(this.#dbCredentials);
      console.log("db running");
    } catch (err) {
      throw new Error("db not running");
    }
  }

  async runCollectors() {
    this.#collectors.forEach(async (collector) => {
      const runningCollector = new collector.collector(collector.settings);
      await runningCollector.setUp();
      runningCollector.run();

      this.runningCollectors.push(runningCollector);
      console.log(`${runningCollector.collector} collector running`);
    });
  }

  async destroyCollectors() {
    this.runningCollectors.forEach(async (collectorInstance) => {
      await collectorInstance.destroy();
    });
    this.runningCollectors = [];
  }

  async runRestApi() {
    server.setUp(this.#serverCredentials);
    await server.run();
    console.log("server running");
  }

  #stopRestApi() {
    server.stop();
    console.log("server stopped");
  }

  run(restartDelay) {
    this.runDb();
    setTimeout(() => this.runCollectors(), restartDelay);
    this.runRestApi();
  }

  stop() {
    this.#stopRestApi();
  }

  async resetCollectors() {
    await this.destroyCollectors();
    await this.runCollectors();
  }
}

const collectors = [
  {
    collector: DiscordCollector,
    settings: {
      tokenArray: [process.env.DISCORD_TOKEN_1, process.env.DISCORD_TOKEN_2],
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
  corsWhitelist: Boolean(process.env.DEBUG_MODE)
    ? [process.env.DEBUG_CLIENT_URL]
    : ["https://memedona.com"],
};

let api;

function run(restartDelay) {
  console.log("Starting Memedona Server!!!");
  if (Boolean(process.env.DEBUG_MODE))
    console.log(`Debugging Mode, client url: ${process.env.DEBUG_CLIENT_URL}`);
  api = new Api(collectors, dbCredentials, serverCredentials);
  api.run(restartDelay);
}

function stop() {
  console.log("Stopping Memedona Server!!!");
  api.stop();
  api = undefined;
}

function resetCollectors() {
  console.log("Reseting Memedona Collectors!!!");
  api.resetCollectors();
}

export { run, stop, resetCollectors };
