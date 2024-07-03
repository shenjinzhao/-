import axios from '@/api'
import { GetRoleListRet } from './type'

const { get } = axios('role')

/**  获取角色列表 */
export const getRoleList = (data: any) => get<GetRoleListRet>('list', data)
