import AxiosInstance from "../../../AxiosConfig";

export default class SavingsDeposit {
  public static async handle(
    year: number,
    month: number,
    amount: number
  ): Promise<string> {
    try {
      const axiosInstance = await AxiosInstance.getInstance();

      const { data } = await axiosInstance.post("/api/savings/deposit", {
        year,
        month,
        savings_amount: amount,
      });

      console.log({ resposne_after_savings_deposit: data });

      return data.message ?? "Success!";
    } catch (error) {
      throw error;
    }
  }
}
