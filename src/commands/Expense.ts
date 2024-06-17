import AxiosInstance from "../AxiosConfig";
import ArgParser from "../apis/ArgParser";

export default class Expense {
  private static parseArgs(args: string[]): {
    expenseAmt: number;
    paidTo?: string;
  } {
    try {
      const amt = ArgParser.parseAmount(args);

      // Paid to
      let paidToIdx = -1;
      let paidTo = "";
      args.forEach((item, idx) => {
        if (item.startsWith("-pt")) return (paidToIdx = idx);
      });
      if (paidToIdx > 0) paidTo = args[paidToIdx].split("=")[1];

      return { expenseAmt: amt, paidTo };
    } catch (err) {
      throw err;
    }
  }

  public static async handle(args: string[]) {
    try {
      const { expenseAmt, paidTo } = this.parseArgs(args);
      console.log({ expenseAmt, paidTo });

      const axiosInstance = await AxiosInstance.getInstance();

      const { data } = await axiosInstance.post("/api/new_expense", {
        expense_amount: expenseAmt,
        paid_to: paidTo,
      });

      return data.message ?? "New expense added!";
    } catch (error) {
      throw error;
    }
  }
}
