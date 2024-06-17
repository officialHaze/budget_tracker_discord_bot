import AxiosInstance from "../../AxiosConfig";

export default class AddIncome {
  public static async handle(amount: number) {
    try {
      const axiosInstance = await AxiosInstance.getInstance();
      const { data } = await axiosInstance.post("/api/income/add", {
        income: amount,
      });
      console.log({ response_after_adding_income: data });
    } catch (error) {
      throw error;
    }
  }
}
