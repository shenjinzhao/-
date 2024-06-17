import axios from "@/api";
import {
  sealListRet,
  sealListParams,
  deleteSealRet,
  deleteSealParams,
  makeSealRet,
  makeSealParams,
} from "./type";

const { get, post } = axios("");

/**  获取印章列表 */
export const getSealList = (data: sealListParams) =>
  get<sealListRet>("seal/list", data);

/**  删除印章 */
export const deleteSeal = (data: deleteSealParams) =>
  post<deleteSealRet>("seal/delete", data);

/**  印章制作 */
export const makeSeal = (data: makeSealParams) =>
  post<makeSealRet>("seal/make", data);
