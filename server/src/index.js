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

  resetCollectors() {
    this.runningCollectors = [];
    this.runCollectors();
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
  corsWhitelist: [
    "http://localhost:3000",
    "https://localhost:5000",
    "http://172.21.202.218:3000",
    "https://5fd9-181-57-126-218.ngrok.io/",
  ],
};

const api = new Api(collectors, dbCredentials, serverCredentials);
function run() {
  console.log("Starting Memedona Server!!!");
  api.run();
}

process.on("uncaughtException", async (err) => {
  console.log("\nUNCAUGHT EXCEPTION");
  if (err.message == "db not running") {
    console.error("Db not running");
    process.exit();
  } else if (
    err.message == "Cannot read properties of undefined (reading 'cache')"
  ) {
    console.log("Undefined cache ;(");
    api.resetCollectors();
  } else {
    console.log(err);
    console.log(err.message);

    process.exit();
  }
});

run();
