import axios from "@/api";
import {
  sealApplyListRet,
  sealApplyListParams,
  sealApplyRet,
  sealApplyParams,
  deleteSealApplyRet,
  deleteSealApplyParams,
  approvalSealApplyRet,
  approvalSealApplyParams
} from "./type";

const { get, post } = axios("");

/**  分页获取印章申请列表 */
export const getSealApplyList = (data: sealApplyListParams) =>
  get<sealApplyListRet>("seal_apply/page", data);

/**  印章申请 */
export const sealApply = (data: any) =>
  post<sealApplyRet>("seal_apply/apply", data);

/**  删除印章申请 */
export const deleteSealApply = (data: deleteSealApplyParams) =>
  post<deleteSealApplyRet>("seal_apply/delete", data);

/**  印章申请审批 */
export const approvalSealApply = (data: approvalSealApplyParams) =>
  post<approvalSealApplyRet>("seal_apply/approval", data);
