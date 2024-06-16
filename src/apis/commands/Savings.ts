import ArgParser from "../ArgParser";
import SavingsDeposit from "./subcommands/SavingsDeposit";

export default class Savings {
  private static supportedSubcommands = ["deposit", "withdraw"];

  private static parseArgs(args: string[]): {
    year: number;
    month: number;
    amount: number;
  } {
    try {
      const year = ArgParser.parseYear(args);
      const month = ArgParser.parseMonth(args);
      const amount = ArgParser.parseAmount(args);

      return { year, month, amount };
    } catch (error) {
      throw error;
    }
  }

  public static async handle(subcommand: string, args: string[]) {
    try {
      if (!subcommand)
        throw new Error(
          "Need a valid subcommand! Supported subcommands are: " +
            this.supportedSubcommands.toString()
        );

      const { year, month, amount } = this.parseArgs(args);

      switch (subcommand.toLowerCase()) {
        case "deposit":
          const message = await SavingsDeposit.handle(year, month, amount);
          return message;

        case "withdraw":
          console.log("Withdraw API is not yet ready!");
          return "Withdraw API is not yet ready!";

        default:
          throw new Error(
            "Need a valid subcommand! Supported subcommands are: " +
              this.supportedSubcommands.toString()
          );
      }
    } catch (error) {
      throw error;
    }
  }
}
