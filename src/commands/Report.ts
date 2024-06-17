import ExpenseReport from "./subcommands/reportRelated/ExpenseReport";
import IncomeReport from "./subcommands/reportRelated/IncomeReport";

export default class Report {
  private static supportedSubcommands = ["expense", "income"];

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
          return {
            total: "Total expense: " + expenseRes.totalExpense + "/-",
            downloadLink: expenseRes.downloadLink,
          };

        case "income":
          const incomeReportRes = await IncomeReport.handle(args);
          return {
            total:
              "Total outstanding income: " +
              incomeReportRes.totalOutstanding +
              "/-",
            downloadLink: incomeReportRes.downloadLink,
          };

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
