import AxiosInstance from "../../AxiosConfig";

export default class SavingsWithdraw {
  public static async handle(amount: number): Promise<string> {
    try {
      const axiosInstance = await AxiosInstance.getInstance();

      const { data } = await axiosInstance.post("/api/savings/withdraw", {
        withdraw_amount: amount,
      });

      console.log({ resposne_after_savings_withdraw: data });

      return data.message ?? "Success!";
    } catch (error) {
      throw error;
    }
  }
}
