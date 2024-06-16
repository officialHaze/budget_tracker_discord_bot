import ArgParser from "../ArgParser";
import AddIncome from "./subcommands/AddIncome";

export default class Income {
  private static supportedSubCommands = ["add"];

  private static parseArgs(args: string[]): {
    amount: number;
    month: number;
    year: number;
  } {
    try {
      const year = ArgParser.parseYear(args);
      const month = ArgParser.parseMonth(args);
      const amt = ArgParser.parseAmount(args);

      return { amount: amt, month, year };
    } catch (err) {
      throw err;
    }
  }

  public static async handle(subcommand: string, args: string[]) {
    try {
      if (!subcommand) throw new Error("Subcommand required!");

      const { amount, month, year } = this.parseArgs(args);
      console.log({ year, month, amount });

      switch (subcommand.toLowerCase()) {
        case "add":
          await AddIncome.handle(year, month, amount);
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
