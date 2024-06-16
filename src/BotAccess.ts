import { Client, GatewayIntentBits } from "discord.js";

export default class BotAccess {
  public static async login() {
    const client = new Client({
      intents: ["Guilds", "GuildMessages", "MessageContent"],
    });
    const discordBotLogin = await client.login(process.env.BOT_TOKEN);
    console.log({ discordBotLogin });

    return client;
  }
}
