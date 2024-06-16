export default class ArgParser {
  public static parseMonth(args: string[]) {
    // Month
    let monthIdx = -1;
    args.forEach((item, idx) => {
      if (item.startsWith("-m")) return (monthIdx = idx);
    });
    if (monthIdx < 0) throw new Error("-m arg required!");
    const monthStr = args[monthIdx].split("=")[1];
    const month = parseInt(monthStr);

    if (isNaN(month)) throw new Error("Invalid month!");

    return month;
  }

  public static parseYear(args: string[]) {
    // Year
    let yearIdx = -1;
    args.forEach((item, idx) => {
      if (item.startsWith("-y")) return (yearIdx = idx);
    });
    if (yearIdx < 0) throw new Error("-y arg required!");
    const yearStr = args[yearIdx].split("=")[1];
    const year = parseInt(yearStr);

    if (isNaN(year)) throw new Error("Invalid year!");

    return year;
  }

  public static parseAmount(args: string[]) {
    // Amount
    let amtIdx = -1;
    args.forEach((item, idx) => {
      if (item.startsWith("-a")) return (amtIdx = idx);
    });
    if (amtIdx < 0) throw new Error("-a arg required!");
    const amtStr = args[amtIdx].split("=")[1];
    const amt = parseFloat(amtStr);

    if (isNaN(amt)) throw new Error("Invalid amount!");

    return amt;
  }
}
