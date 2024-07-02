// 表格数据每项
export interface tableItem {
  id: number; // 主键
  sealApplyCode: string; // 印章申请编号
  sealName: string; // 印章名称
  sealTypeCode: number; // 印章类型编码
  applyTime: string; // 申请时间
  status: STATUS; // 申请状态
  approvalTime: string; // 审批时间
  ownerId: number; // 持有人ID
  operatorId: number; // 操作人ID
  sealImage: string; // 印章图片
}
// 分页信息
interface pageable {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
}
// 完整信息
interface data {
  content: Array<tableItem>;
  pageable: pageable;
}
export interface sealApplyListRet {
  code: number;
  data: data;
  msg: string;
}

export interface sealApplyListParams {
  current: number;
  limit: number;
}

/**  印章申请 */
export interface sealApplyRet {
  code: number;
  data: null;
  msg: string;
}

export interface sealApplyParams {
  sealTypeCode: string; // 印章类型编码
  sealName: string; // 印章名称
  userId: string; // 印章持有人ID
  file: File; // 印章图片
}
/**  删除印章申请 */
export interface deleteSealApplyRet {
  code: number;
  data: null;
  msg: string;
}

export interface deleteSealApplyParams {
  sealApplyCode: string; // 印章申请编码
}

/**  印章申请审批 */
export interface approvalSealApplyRet {
  code: number;
  data: null;
  msg: string;
}

export interface approvalSealApplyParams {
  sealApplyCode: string; // 印章申请编码
  status: STATUS; // 审核状态
}

// 枚举状态
export const enum STATUS {
  InReview = 0, // 待审批
  Pass = 1, // 通过
  NotPass = 2, // 未通过
}