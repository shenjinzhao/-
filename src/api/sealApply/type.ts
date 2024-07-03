import { UniversalListParams, UniversalListRet } from '@/declare'

// 表格数据每项
export interface SealApplyListItem {
  id: number // 主键
  sealApplyCode: string // 印章申请编号
  sealName: string // 印章名称
  sealTypeCode: number // 印章类型编码
  applyTime: string // 申请时间
  status: Status // 申请状态
  approvalTime: string // 审批时间
  ownerId: number // 持有人ID
  operatorId: number // 操作人ID
  sealImage: string // 印章图片
}

// 完整信息
export type SealApplyListRet = UniversalListRet<SealApplyListItem>

export type SealApplyListParams = UniversalListParams

export interface SealApplyParams {
  sealTypeCode: string // 印章类型编码
  sealName: string // 印章名称
  userId: string // 印章持有人ID
  file: File // 印章图片
}

export interface DeleteSealApplyParams {
  sealApplyCode: string // 印章申请编码
}

export interface ApprovalSealApplyParams {
  sealApplyCode: string // 印章申请编码
  status: Status // 审核状态
}

// 枚举状态
export const enum Status {
  InReview = 0, // 待审批
  Pass = 1, // 通过
  NotPass = 2 // 未通过
}
