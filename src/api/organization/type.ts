import { UniversalListParams, UniversalListRet } from '@/declare'

// 表格数据每项
export interface OrgListItem {
  id: number
  sealTypeCode: string
  sealTypeName: string
  status: number
}
// 完整信息
export type OrgListRet = UniversalListRet<OrgListItem>
export type OrgListParams = UniversalListParams

export interface GetOrgInfoByCodeParams {
  sealTypeCode: string
  sealTypeName: string
}

export interface AddOrgParams {
  sealTypeId: number // 印章类型ID
}

export interface GetOrgTreeParams {
  sealTypeId: number // 印章类型ID
}

export interface EditOrgParams {
  sealTypeId: number // 印章类型ID
}

export interface ChangeStatusOrgParams {
  sealTypeId: number // 印章类型ID
}
