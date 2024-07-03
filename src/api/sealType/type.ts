import { UniversalListParams, UniversalListRet } from '@/declare'

// 表格数据每项
export interface SealTypeItem {
  id: number
  sealTypeCode: string
  sealTypeName: string
  status: number
  userType: UserType
}
export type SealTypeRet = UniversalListRet<SealTypeItem>

export type SealTypeParams = UniversalListParams

export interface AddSealTypeParams {
  sealTypeCode: string
  sealTypeName: string
  userType: UserType
}

export interface EditSealTypeParams {
  sealTypeId: number
  sealTypeCode: string
  sealTypeName: string
  userType: UserType
}

export interface SealStatusParams {
  sealTypeId: number // 印章类型ID
}

export type SealTypeListNoPageRet = Array<SealTypeItem>
const enum UserType {
  Org = 1,
  Person = 2
}
