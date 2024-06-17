import ExpenseReport from "./subcommands/ExpenseReport";

export default class Report {
  private static supportedSubcommands = ["expense"];

  public static async handle(subcommand: string, args: string[]) {
    try {
      if (!subcommand)
        throw new Error(
          "Need a valid subcommand! Supported subcommands are: " +
            this.supportedSubcommands.toString()
        );

      switch (subcommand.toLowerCase()) {
        case "expense":
          const expenseRes = await ExpenseReport.handle(args);
          return expenseRes;

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
