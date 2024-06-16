import { Client } from "discord.js";
import env from "../env.json";

export default class BotAccess {
  public static async login() {
    const client = new Client({
      intents: ["Guilds", "GuildMessages", "MessageContent"],
    });
    const discordBotLogin = await client.login(env.BOT_TOKEN);
    console.log({ discordBotLogin });

    return client;
  }
}
