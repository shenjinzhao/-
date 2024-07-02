import axios from "@/api";
import {
  sealTypeRet,
  sealStatusRet,
  addSealTypeRet,
  addSealTypeParams,
  sealTypeParams,
  sealStatusParams,
  editSealTypeRet,
  editSealTypeParams,
  sealTypeListNoPageRet
} from "./type";

const { get, post } = axios("");

/**  获取印章类型列表数据 */
export const getSealTypeList = (data: sealTypeParams) =>
  get<sealTypeRet>("sealType/page", data);

/**  新增印章类型 */
export const addSealType = (data: addSealTypeParams) =>
  post<addSealTypeRet>("sealType/add", data);

/**  编辑印章类型 */
export const editSealType = (data: editSealTypeParams) =>
  post<editSealTypeRet>("sealType/edit", data);

/**  修改印章类型状态 */
export const changeSealTypeStatus = (data: sealStatusParams) =>
  post<sealStatusRet>("sealType/enableOrDisable", data);

/**  获取启用的印章类型列表(不分页) */
export const getSealTypeListNoPage = (data: any) =>
  get<sealTypeListNoPageRet>("sealType/list/enable", data);