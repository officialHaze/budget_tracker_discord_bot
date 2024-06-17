import { Client, Message } from "discord.js";
import { Command } from "../apis/Command";

export default class HandleGuldMessages {
  public static async init(message: Message) {
    const isBot = message.author.bot;
    console.log({ isBot: isBot });
    if (isBot) return;

    try {
      const command = Command.parse(message);
      if (!command) return;

      const successMessage:
        | string
        | { content: string; attachmentLink: string } = await Command.handle(
        command.command,
        command.subcommand,
        command.args
      );
      if (typeof successMessage === "string")
        return message.reply(successMessage);

      // Send attachment
      const splits = successMessage.attachmentLink.split("/");
      const attachmentName = splits[splits.length - 1];
      message.channel.send({
        files: [
          {
            attachment: successMessage.attachmentLink,
            name: attachmentName,
          },
        ],
        content: successMessage.content,
      });
    } catch (err: any) {
      console.error(err);
      message.reply(
        err.response?.data?.message ??
          err.message ??
          "Some error occurred in backend!"
      );
    }
  }
}
