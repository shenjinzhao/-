import axios from "@/api";
import { sealTypeRet, sealTypeParams } from "./type";

const { get } = axios("");

/**  获取印章列表数据 */
export const getSealTypeList = (data: sealTypeParams) =>
  get<sealTypeRet>("sealType/list", data);
