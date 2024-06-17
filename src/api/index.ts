import { create } from "sdzm-axios";
import { serviceInterceptors } from "./interceptors";
const { insertPrefix, service } = create({
  baseURL: "eSignature",
  timeout: 3 * 60 * 1000,
});
serviceInterceptors(service);
export default insertPrefix;
