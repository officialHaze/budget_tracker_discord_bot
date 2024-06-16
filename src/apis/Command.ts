import { Message } from "discord.js";

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

  public static handle(command: string, subcommand: string, args: string[]) {
    try {
      switch (command.toLowerCase()) {
        case "income":
          Income.handle(subcommand, args);
          break;

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

class Income {
  private static supportedSubCommands = ["add"];

  private static parseArgs(args: string[]): {
    year: number;
    month: number;
    amount: number;
    paidTo?: string;
  } {
    // Year
    let yearIdx = -1;
    args.forEach((item, idx) => {
      if (item.startsWith("-y")) return (yearIdx = idx);
    });
    if (yearIdx < 0) throw new Error("-y arg required!");
    const yearStr = args[yearIdx].split("=")[1];
    const year = parseInt(yearStr);

    // Month
    let monthIdx = -1;
    args.forEach((item, idx) => {
      if (item.startsWith("-m")) return (monthIdx = idx);
    });
    if (monthIdx < 0) throw new Error("-m arg required!");
    const monthStr = args[monthIdx].split("=")[1];
    const month = parseInt(monthStr);

    // Amount
    let amtIdx = -1;
    args.forEach((item, idx) => {
      if (item.startsWith("-a")) return (amtIdx = idx);
    });
    if (amtIdx < 0) throw new Error("-a arg required!");
    const amtStr = args[amtIdx].split("=")[1];
    const amt = parseFloat(amtStr);

    if (isNaN(year)) throw new Error("Invalid year!");
    if (isNaN(month)) throw new Error("Invalid month!");
    if (isNaN(amt)) throw new Error("Invalid amount!");

    return { year, month, amount: amt };
  }

  private static add(amount: number) {
    try {
    } catch (error) {
      throw error;
    }
  }

  public static handle(subcommand: string, args: string[]) {
    try {
      if (!subcommand) throw new Error("Subcommand required!");

      const { year, month, amount } = this.parseArgs(args);
      console.log({ year, month, amount });

      switch (subcommand.toLowerCase()) {
        case "add":
          break;

        default:
          throw new Error(
            "Check the subcommand. Supported subcommands for income: " +
              this.supportedSubCommands.toString()
          );
      }
    } catch (err) {
      throw err;
    }
  }
}
