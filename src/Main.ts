import BotAccess from "./BotAccess";
import "dotenv/config";
import HandleGuldMessages from "./handlers/HandleGuildMessages";

class Main {
  public static async main() {
    try {
      // Get access to bot
      const bot = await BotAccess.login();

      // Handle messages
      bot.on("messageCreate", HandleGuldMessages.init);
    } catch (err) {
      console.error(err);
    }
  }
}

Main.main();
