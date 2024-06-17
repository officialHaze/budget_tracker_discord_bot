import ArgParser from "../apis/ArgParser";
import SavingsDeposit from "./subcommands/savingsRelated/SavingsDeposit";
import SavingsWithdraw from "./subcommands/savingsRelated/SavingsWithdraw";

export default class Savings {
  private static supportedSubcommands = ["deposit", "withdraw"];

  private static parseArgs(args: string[]): {
    amount: number;
  } {
    try {
      const amount = ArgParser.parseAmount(args);

      return { amount };
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

      const { amount } = this.parseArgs(args);

      switch (subcommand.toLowerCase()) {
        case "deposit":
          const message = await SavingsDeposit.handle(amount);
          return message;

        case "withdraw":
          const withdrawRes: string = await SavingsWithdraw.handle(amount);
          return withdrawRes;

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
