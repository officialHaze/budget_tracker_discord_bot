import axiosInstance from "../../AxiosConfig";
import AddIncome from "./subcommands/AddIncome";

export default class Income {
  private static supportedSubCommands = ["add"];

  private static parseArgs(args: string[]): {
    year: number;
    month: number;
    amount: number;
    paidTo?: string;
  } {
    // Year
    let yearIdx = -1;
    args.forEach((item, idx) => {
      if (item.startsWith("-y")) return (yearIdx = idx);
    });
    if (yearIdx < 0) throw new Error("-y arg required!");
    const yearStr = args[yearIdx].split("=")[1];
    const year = parseInt(yearStr);

    // Month
    let monthIdx = -1;
    args.forEach((item, idx) => {
      if (item.startsWith("-m")) return (monthIdx = idx);
    });
    if (monthIdx < 0) throw new Error("-m arg required!");
    const monthStr = args[monthIdx].split("=")[1];
    const month = parseInt(monthStr);

    // Amount
    let amtIdx = -1;
    args.forEach((item, idx) => {
      if (item.startsWith("-a")) return (amtIdx = idx);
    });
    if (amtIdx < 0) throw new Error("-a arg required!");
    const amtStr = args[amtIdx].split("=")[1];
    const amt = parseFloat(amtStr);

    if (isNaN(year)) throw new Error("Invalid year!");
    if (isNaN(month)) throw new Error("Invalid month!");
    if (isNaN(amt)) throw new Error("Invalid amount!");

    return { year, month, amount: amt };
  }

  public static async handle(subcommand: string, args: string[]) {
    try {
      if (!subcommand) throw new Error("Subcommand required!");

      const { year, month, amount } = this.parseArgs(args);
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
