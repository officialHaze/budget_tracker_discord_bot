import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.FMS_SERVER_BASEURL,
  withCredentials: true,
  timeout: 1000 * 10,
});

export default axiosInstance;
