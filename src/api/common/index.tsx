import axios from "@/api";
import { getRoleListRet } from "./type";

const { get } = axios("");

/**  获取角色列表 */
export const getRoleList = (data: any) =>
  get<getRoleListRet>("role/list", data);
