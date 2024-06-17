import axios from "@/api";
import { LoginInfoRet, LoginParams } from "./type";

const { post } = axios("");

/**  用户登录 */
export const login = (data: LoginParams) =>
  post<LoginInfoRet>("admin/login", data);
