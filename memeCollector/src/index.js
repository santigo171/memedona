import { DiscordCollector } from "./DiscordCollector.js";
import express from "express";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Hello World!",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

async function runDiscordCollector() {
  const discordCollector = new DiscordCollector({
    tokenArray: [process.env.DISCORD_TOKEN_1, process.env.DISCORD_TOKEN_2],
    collectorIdInDb: process.env.DISCORD_ID_IN_DB,
  });
  await discordCollector.setUp();
  discordCollector.run();
}

runDiscordCollector();
