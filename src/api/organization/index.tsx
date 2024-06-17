import axios from "@/api";
import {
  orgListRet,
  orgListParams,
  getOrgInfoByCodeRet,
  getOrgInfoByCodeParams,
  addOrgRet,
  addOrgParams,
  getOrgTreeRet,
  getOrgTreeParams,
  editOrgRet,
  editOrgParams,
  changeStatusOrgRet,
  changeStatusOrgParams
} from "./type";

const { get, post } = axios("");

/**  获取机构列表 */
export const getOrgList = (data: orgListParams) =>
  get<orgListRet>("org/list", data);

/**  根据机构代码获取机构信息 */
export const getOrgInfoByCode = (data: getOrgInfoByCodeParams) =>
  get<getOrgInfoByCodeRet>("org/sdzm", data);

/**  新增机构 */
export const addOrg = (data: addOrgParams) =>
  post<addOrgRet>("org/add", data);

/**  获取机构树列表 */
export const getOrgTree = (data: getOrgTreeParams) =>
  get<getOrgTreeRet>("org/getTree", data);

/**  编辑机构 */
export const editOrg = (data: editOrgParams) =>
  post<editOrgRet>("org/edit", data);

  
/**  修改机构状态 */
export const changeStatusOrg = (data: changeStatusOrgParams) =>
  post<changeStatusOrgRet>("org/enableOrDisable", data);
