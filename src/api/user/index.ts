import axios from "@/api";
import { LoginInfoRet, LoginInfoParams } from "./type";

const { get } = axios("user");

/**  用户个人登录信息 */
export const getUserInfo = (data: LoginInfoParams) =>
  get<LoginInfoRet>("logininfo", data);
