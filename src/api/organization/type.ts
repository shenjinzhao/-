// 表格数据每项
interface tableItem {
  id: number;
  sealTypeCode: string;
  sealTypeName: string;
  status: number;
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
export interface orgListRet {
  code: number;
  data: data;
  msg: string;
}

export interface orgListParams {
  current: number;
  limit: number;
}


export interface getOrgInfoByCodeRet {
  code: number;
  data: null;
  msg: string;
}

export interface getOrgInfoByCodeParams {
  sealTypeCode: string;
  sealTypeName: string;
}
export interface addOrgRet {
  code: number;
  data: null;
  msg: string;
}
export interface addOrgParams {
  sealTypeId: number; // 印章类型ID
}
export interface getOrgTreeRet {
  code: number;
  data: null;
  msg: string;
}
export interface getOrgTreeParams {
  sealTypeId: number; // 印章类型ID
}
export interface editOrgRet {
  code: number;
  data: null;
  msg: string;
}
export interface editOrgParams {
  sealTypeId: number; // 印章类型ID
}
export interface changeStatusOrgRet {
  code: number;
  data: null;
  msg: string;
}
export interface changeStatusOrgParams {
  sealTypeId: number; // 印章类型ID
}