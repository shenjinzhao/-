import axios from '@/api'
import {
  AddOrgParams,
  ChangeStatusOrgParams,
  EditOrgParams,
  GetOrgInfoByCodeParams,
  GetOrgTreeParams,
  OrgListParams,
  OrgListRet
} from './type'

const { get, post } = axios('org')

/**  获取机构列表 */
export const getOrgList = (data: OrgListParams) => get<OrgListRet>('list', data)

/**  根据机构代码获取机构信息 */
export const getOrgInfoByCode = (data: GetOrgInfoByCodeParams) => get('sdzm', data)

/**  新增机构 */
export const addOrg = (data: AddOrgParams) => post('add', data)

/**  获取机构树列表 */
export const getOrgTree = (data: GetOrgTreeParams) => get('getTree', data)

/**  编辑机构 */
export const editOrg = (data: EditOrgParams) => post('edit', data)

/**  修改机构状态 */
export const changeStatusOrg = (data: ChangeStatusOrgParams) => post('enableOrDisable', data)
