import axios from "@/api";
import {
  sealTypeRet,
  sealStatusRet,
  addSealTypeRet,
  addSealTypeParams,
  sealTypeParams,
  sealStatusParams,
} from "./type";

const { get, post } = axios("");

/**  获取印章类型列表数据 */
export const getSealTypeList = (data: sealTypeParams) =>
  get<sealTypeRet>("sealType/page", data);

/**  新增印章类型 */
export const addSealType = (data: addSealTypeParams) =>
  post<addSealTypeRet>("sealType/add", data);

/**  修改印章类型状态 */
export const changeSealTypeStatus = (data: sealStatusParams) =>
  post<sealStatusRet>("sealType/enableOrDisable", data);
