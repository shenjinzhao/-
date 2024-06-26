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
export interface sealTypeRet {
  code: number;
  data: data;
  msg: string;
}

export interface sealTypeParams {
  current: number;
  limit: number;
}


export interface addSealTypeRet {
  code: number;
  data: null;
  msg: string;
}

export interface addSealTypeParams {
  sealTypeCode: string;
  sealTypeName: string;
}
export interface sealStatusRet {
  code: number;
  data: null;
  msg: string;
}
export interface sealStatusParams {
  sealTypeId: number; // 印章类型ID
}