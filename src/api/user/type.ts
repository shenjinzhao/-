export interface User {
  id: number;
  userName: string;
  userCode: string;
  userIdCard: string;
  createTime: string;
  status: number;
  roleId: number;
  roleName: string;
  orgId: number;
  orgName: string;
  userType: USERTYPE
}
const enum USERTYPE {
  Org = 1, // 机构
  Person = 2 // 个人
}
export interface getUserByOrgCodeRet {
  code: number;
  data: Array<User>;
  msg: string;
}

export interface getUserByOrgCodeParams {
  orgCode: string; // 机构编码
}

interface pageable {
  pageSize: number;
  pageNumber: number;
  totalElements: number;
  totalPages: number;
}

interface data {
  content: Array<User>;
  pageable: pageable
}

export interface getUserListPageRet {
  code: number;
  data: data;
  msg: string;
}

export interface getUserListPageParams {
  limit: number;
  current: number;
}

export interface addUserRet {
  code: number;
  data: any;
  msg: string;
}

export interface addUserParams {
  userName: string;
  userCode: string;
  userIdCard: string;
  userType: USERTYPE;
  password: string;
  roleCode: string;
}

export interface editUserRet {
  code: number;
  data: any;
  msg: string;
}

export interface editUserParams {
  userId: number;
  userName: string;
  userCode: string;
  userIdCard: string;
  userType: USERTYPE;
  password: string;
  roleCode: string;
}

export interface deleteRet {
  code: number;
  data: any;
  msg: string;
}

export interface deleteUserParams {
  userId: number;
}
