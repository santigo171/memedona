// dotenv
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

// express
import express from "express";

// Modules
import { DiscordCollector } from "./MemeCollectors/DiscordCollector.js";
import { db } from "./Database.js";

class Api {
  #collectors;
  #dbCredentials;

  constructor(collectors, dbCredentials) {
    this.#collectors = collectors;
    this.#dbCredentials = dbCredentials;
  }

  async run() {
    // run db
    await db.setUp(this.#dbCredentials);
    console.log("Db running");

    // run collectors
    this.#collectors.forEach(async (collector) => {
      const runningCollector = new collector.collector(collector.settings);
      await runningCollector.setUp();
      runningCollector.run();
      console.log("collector running");
    });

    // run rest api
    const app = express();
    const port = process.env.PORT || 5000;
    app.use(express.json());

    app.get("/", (req, res) => {
      const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

      res.status(200).send({
        memes: `${fullUrl}meme`,
      });
    });

    app.get("/meme", (req, res) => {});

    app.listen(port, () => console.log(`Server running on port ${port}`));
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

const api = new Api(collectors, dbCredentials);
api.run();
