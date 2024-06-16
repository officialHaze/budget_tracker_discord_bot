import { Message } from "discord.js";
import axiosInstance from "../AxiosConfig";
import Income from "./commands/Income";

export class Command {
  private static prefix = "!";

  public static parse(
    message: Message
  ): { command: string; subcommand: string; args: string[] } | null {
    const messageContent = message.content;
    console.log({ message: messageContent });
    if (!messageContent.startsWith(this.prefix)) return null;

    const command = messageContent.split("!")[1].split(" ")[0] ?? "";
    console.log({ command });

    let subcommand = messageContent.split(" ")[1] ?? "";
    if (subcommand.includes("-") || subcommand.includes("=")) subcommand = "";
    console.log({ subcommand });

    let args: string[] = [];
    const splits = messageContent.split(" ");
    for (let i = !subcommand ? 1 : 2; i < splits.length; i++) {
      args.push(splits[i]);
    }
    console.log({ args });

    if (!command) throw new Error("Command needed");

    return { command, subcommand, args };
  }

  public static async handle(
    command: string,
    subcommand: string,
    args: string[]
  ) {
    try {
      switch (command.toLowerCase()) {
        case "income":
          const message = await Income.handle(subcommand, args);
          return message;

        default:
          throw new Error(
            "Check the command you have passed! It is most likely not supported!"
          );
      }
    } catch (err) {
      throw err;
    }
  }
}
