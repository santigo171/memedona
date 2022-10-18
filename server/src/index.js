// dotenv
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

// Modules
import { db } from "./Database.js";
import { server } from "./server/server.js";

class Api {
  #dbCredentials;
  #serverCredentials;

  constructor(dbCredentials, serverCredentials) {
    this.#dbCredentials = dbCredentials;
    this.#serverCredentials = serverCredentials;
  }

  async runDb() {
    try {
      await db.setUp(this.#dbCredentials);
      console.log("db running");
      db.verifySize();
    } catch (err) {
      throw new Error(`db not running ${err}`);
    }
  }

  async runRestApi() {
    server.setUp(this.#serverCredentials);
    await server.run();
    console.log("server running");
  }

  run() {
    this.runDb();
    this.runRestApi();
  }
}

const dbCredentials = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const serverCredentials = {
  port: process.env.PORT || 5000,
  corsWhitelist: Boolean(process.env.DEBUG_MODE)
    ? [process.env.DEBUG_CLIENT_URL]
    : ["https://memedona.com", "https://www.memedona.com"],
};

console.log("Starting Memedona Server!!!");
if (Boolean(process.env.DEBUG_MODE))
  console.log(`Debugging Mode, client url: ${process.env.DEBUG_CLIENT_URL}`);

const api = new Api(dbCredentials, serverCredentials);
api.run();
