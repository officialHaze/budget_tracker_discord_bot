import ArgParser from "../apis/ArgParser";
import AddIncome from "./subcommands/AddIncome";

export default class Income {
  private static supportedSubCommands = ["add"];

  private static parseArgs(args: string[]): {
    amount: number;
  } {
    try {
      const year = ArgParser.parseYear(args);
      const month = ArgParser.parseMonth(args);
      const amt = ArgParser.parseAmount(args);

      return { amount: amt };
    } catch (err) {
      throw err;
    }
  }

  public static async handle(subcommand: string, args: string[]) {
    try {
      if (!subcommand) throw new Error("Subcommand required!");

      const { amount } = this.parseArgs(args);
      console.log({ amount });

      switch (subcommand.toLowerCase()) {
        case "add":
          await AddIncome.handle(amount);
          return "Income added successfully!";

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
