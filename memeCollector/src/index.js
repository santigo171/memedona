import { DiscordCollector } from "./DiscordCollector.js";

async function runDiscordCollector() {
  const discordCollector = new DiscordCollector({
    tokenArray: [process.env.DISCORD_TOKEN_1, process.env.DISCORD_TOKEN_2],
    collectorIdInDb: process.env.DISCORD_ID_IN_DB,
  });
  await discordCollector.setUp();
  await discordCollector.run();
}

runDiscordCollector();
