import { UniversalListParams, UniversalListRet } from '@/declare'

// 表格数据每项
export interface SealListItem {
  sealCode: string
  sealName: string
  sealTypeCode: number
  sealTypeName: string
  sealImage: string
}

// 完整信息
export type SealListRet = UniversalListRet<SealListItem>

export type SealListParams = UniversalListParams

export interface DeleteSealParams {
  sealCode: string
}

export interface MakeSealParams {
  sealTypeId: number // 印章类型ID
}
