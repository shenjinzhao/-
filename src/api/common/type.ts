export interface Role {
  id: number
  roleName: string
  roleCode: string
  status: number
  createTime: string
}

export type GetRoleListRet = Array<Role>
