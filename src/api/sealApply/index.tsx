import axios from '@/api'
import {
  SealApplyListParams,
  SealApplyListRet,
  DeleteSealApplyParams,
  ApprovalSealApplyParams
} from './type'

const { get, post } = axios('seal_apply')

/**  分页获取印章申请列表 */
export const getSealApplyList = (data: SealApplyListParams) => get<SealApplyListRet>('page', data)

/**  印章申请 */
export const sealApply = (data: any) => post('apply', data)

/**  删除印章申请 */
export const deleteSealApply = (data: DeleteSealApplyParams) => post('delete', data)

/**  印章申请审批 */
export const approvalSealApply = (data: ApprovalSealApplyParams) => post('approval', data)
