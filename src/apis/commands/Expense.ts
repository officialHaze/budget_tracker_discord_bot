import axiosInstance from "../../AxiosConfig";
import ArgParser from "../ArgParser";

export default class Expense {
  private static parseArgs(args: string[]): {
    year: number;
    month: number;
    expenseAmt: number;
    paidTo?: string;
  } {
    try {
      const year = ArgParser.parseYear(args);
      const month = ArgParser.parseMonth(args);
      const amt = ArgParser.parseAmount(args);

      // Paid to
      let paidToIdx = -1;
      let paidTo = "";
      args.forEach((item, idx) => {
        if (item.startsWith("-pt")) return (paidToIdx = idx);
      });
      if (paidToIdx > 0) paidTo = args[paidToIdx].split("=")[1];

      return { year, month, expenseAmt: amt, paidTo };
    } catch (err) {
      throw err;
    }
  }

  public static async handle(args: string[]) {
    try {
      const { year, month, expenseAmt, paidTo } = this.parseArgs(args);
      console.log({ year, month, expenseAmt, paidTo });

      const { data } = await axiosInstance.post("/api/new_expense", {
        year,
        month,
        expense_amount: expenseAmt,
        paid_to: paidTo,
      });

      return data.message ?? "New expense added!";
    } catch (error) {
      throw error;
    }
  }
}
