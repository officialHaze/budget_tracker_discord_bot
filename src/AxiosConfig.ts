import axios from "axios";
import fs from "fs/promises";
import path from "path";
import env from "../env.json";

const getSecretKey = async () => {
  try {
    const secretBuff = await fs.readFile(
      path.join(__dirname, "../secretkey.pem")
    );
    return secretBuff.toString();
  } catch (error) {
    console.error(error);
  }
};

export default class AxiosInstance {
  public static async getInstance() {
    try {
      const secretKey = await getSecretKey();

      return axios.create({
        baseURL: env.FMS_SERVER_BASEURL,
        headers: {
          secret: secretKey,
        },
        withCredentials: true,
        timeout: 1000 * 10,
      });
    } catch (error) {
      throw error;
    }
  }
}
