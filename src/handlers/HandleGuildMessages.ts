import { Client, Message } from "discord.js";
import { Command } from "../apis/Command";

export default class HandleGuldMessages {
  public static init(message: Message) {
    const isBot = message.author.bot;
    console.log({ isBot: isBot });
    if (isBot) return;

    try {
      const command = Command.parse(message);
      if (!command) return;

      Command.handle(command.command, command.subcommand, command.args);
    } catch (err: any) {
      console.error(err);
      message.reply(err.message ?? "Some error occurred in backend!");
    }
  }
}
