import axios from '@/api'
import {
  GetUserByOrgCodeRet,
  GetUserListPageParams,
  AddUserParams,
  EditUserParams,
  DeleteUserParams,
  GetUserListPageRet
} from './type'

const { get, post } = axios('user')
/**  获取用户列表不分页 */
export const getUserList = (data: any) => get<GetUserByOrgCodeRet>('list', data)

/**  获取用户列表分页 */
export const getUserListPage = (data: GetUserListPageParams) =>
  get<GetUserListPageRet>('page', data)

/**  添加用户 */
export const addUser = (data: AddUserParams) => post('add', data)

/**  编辑用户 */
export const editUser = (data: EditUserParams) => post('edit', data)

/**  删除用户 */
export const deleteUser = (data: DeleteUserParams) => post('delete', data)
