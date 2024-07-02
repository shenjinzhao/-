import axios from "@/api";
import { LoginInfoRet, LoginParams } from "./type";

const { post } = axios("");

/**  用户登录 */
export const login = (data: LoginParams) =>
  post<LoginInfoRet>("admin/login", data);

/**  用户登出 */
export const logout = (data: any) =>
  post<LoginInfoRet>("admin/logout", data);