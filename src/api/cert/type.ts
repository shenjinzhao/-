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
export interface certListRet {
  code: number;
  data: data;
  msg: string;
}

export interface certListParams {
  current: number;
  limit: number;
}


export interface registerCertRet {
  code: number;
  data: null;
  msg: string;
}

export interface registerCertParams {
  sealTypeCode: string;
  sealTypeName: string;
}
export interface deleteCertRet {
  code: number;
  data: null;
  msg: string;
}
export interface deleteCertParams {
  sealTypeId: number; // 印章类型ID
}
export interface changeStatusCertRet {
  code: number;
  data: null;
  msg: string;
}
export interface changeStatusCertParams {
  sealTypeId: number; // 印章类型ID
}