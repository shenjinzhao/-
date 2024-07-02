import axios from "@/api";
import { getUserByOrgCodeRet, getUserByOrgCodeParams, getUserListPageParams, getUserListPageRet, addUserParams, addUserRet,deleteUserParams,deleteRet,editUserParams,editUserRet } from "./type";

const { get, post } = axios("");
/**  获取用户列表不分页 */
export const getUserList = (data: any) =>
  get<getUserByOrgCodeRet>("user/list", data);


/**  获取用户列表分页 */
export const getUserListPage = (data: getUserListPageParams) =>
  get<getUserListPageRet>("user/page", data);

/**  添加用户 */
export const addUser = (data: addUserParams) =>
  post<addUserRet>("user/add", data);

/**  编辑用户 */
export const editUser = (data: editUserParams) =>
  post<editUserRet>("user/edit", data);

/**  删除用户 */
export const deleteUser = (data: deleteUserParams) =>
  post<deleteRet>("user/delete", data);
