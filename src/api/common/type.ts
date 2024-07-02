export interface Role {
  id: number;
  roleName: string;
  roleCode: string;
  status: number;
  createTime: string;
}

export interface getRoleListRet {
  code: number;
  data: Array<Role>;
  msg: string;
}
