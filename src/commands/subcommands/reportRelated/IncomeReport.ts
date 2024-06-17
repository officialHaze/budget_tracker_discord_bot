import AxiosInstance from "../../../AxiosConfig";
import ArgParser from "../../../apis/ArgParser";

export default class IncomeReport {
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
  ): Promise<{ totalOutstanding: number; downloadLink: string }> {
    try {
      const { year, month } = this.parseArgs(args);

      const axiosInstance = await AxiosInstance.getInstance();

      if (month <= 0) {
        // Get income report for year
        const { data } = await axiosInstance.get(
          `/api/report/income/year/${year}`
        );
        console.log({ resposne_after_getting_income_report_for_year: data });
        return {
          totalOutstanding: data.totalOutstanding,
          downloadLink: data.downloadReport,
        };
      }

      // Get expense report for month and year
      const { data } = await axiosInstance.get(
        `/api/report/income/month/${year}/${month}`
      );
      console.log({
        resposne_after_getting_income_report_for_year_and_month: data,
      });

      return {
        totalOutstanding: data.totalOutstanding,
        downloadLink: data.downloadReport,
      };
    } catch (error) {
      throw error;
    }
  }
}
