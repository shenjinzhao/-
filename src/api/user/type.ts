import { UniversalListParams, UniversalListRet } from '@/declare'

export interface UserListItem {
  id: number
  userName: string
  userCode: string
  userIdCard: string
  createTime: string
  status: number
  roleId: number
  roleName: string
  orgId: number
  orgName: string
  userType: UserType
}
const enum UserType {
  Org = 1, // 机构
  Person = 2 // 个人
}
export type GetUserByOrgCodeRet = Array<UserListItem>

export interface GetUserByOrgCodeParams {
  orgCode: string // 机构编码
}

export type GetUserListPageRet = UniversalListRet<UserListItem>

export type GetUserListPageParams = UniversalListParams

export interface AddUserParams {
  userName: string
  userCode: string
  userIdCard: string
  userType: UserType
  password: string
  roleCode: string
}

export interface EditUserParams {
  userId: number
  userName: string
  userCode: string
  userIdCard: string
  userType: UserType
  password: string
  roleCode: string
}

export interface DeleteUserParams {
  userId: number
}
