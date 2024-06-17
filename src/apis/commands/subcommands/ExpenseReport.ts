import AxiosInstance from "../../../AxiosConfig";
import ArgParser from "../../ArgParser";

export default class ExpenseReport {
  private static parseArgs(args: string[]): {
    year: number;
    month: number;
  } {
    try {
      const year = ArgParser.parseYear(args);
      const month = ArgParser.parseMonth(args, { notRequired: true });

      return { year, month };
    } catch (error) {
      throw error;
    }
  }

  public static async handle(
    args: string[]
  ): Promise<{ totalExpense: number; downloadLink: string }> {
    try {
      const { year, month } = this.parseArgs(args);

      const axiosInstance = await AxiosInstance.getInstance();

      if (month <= 0) {
        // Get expense report for year
        const { data } = await axiosInstance.get(
          `/api/report/expenses/year/${year}`
        );
        console.log({ resposne_after_getting_expense_report_for_year: data });
        return {
          totalExpense: data.totalExpense,
          downloadLink: data.downloadReport,
        };
      }

      // Get expense report for month and year
      const { data } = await axiosInstance.get(
        `/api/report/expenses/month_and_year/${year}/${month}`
      );
      console.log({
        resposne_after_getting_expense_report_for_year_and_month: data,
      });

      return {
        totalExpense: data.totalExpense,
        downloadLink: data.downloadReport,
      };
    } catch (error) {
      throw error;
    }
  }
}
