import { create } from "sdzm-axios";
import { serviceInterceptors } from "./interceptors";
const { insertPrefix, service } = create({
  baseURL: process.env.NODE_ENV === "development" ? "/eSignature" : process.env.REACT_APP_BASE_URL,
  timeout: 3 * 60 * 1000,
});
serviceInterceptors(service);
export default insertPrefix;
