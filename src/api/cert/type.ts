import { UniversalListParams, UniversalListRet } from '@/declare'

// 表格数据每项
interface CertListItem {
  id: number
  sealTypeCode: string
  sealTypeName: string
  status: number
}

// 完整信息
export type CertListRet = UniversalListRet<CertListItem>

export type CertListParams = UniversalListParams
export interface RegisterCertParams {
  sealTypeCode: string
  sealTypeName: string
}

export interface DeleteCertParams {
  sealTypeId: number // 印章类型ID
}

export interface ChangeStatusCertParams {
  sealTypeId: number // 印章类型ID
}
