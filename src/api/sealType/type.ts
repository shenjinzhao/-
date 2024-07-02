// 表格数据每项
export interface sealTypeItem {
  id: number;
  sealTypeCode: string;
  sealTypeName: string;
  status: number;
  userType: USERTYPE;
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
  content: Array<sealTypeItem>;
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
  userType: USERTYPE;
}

export interface editSealTypeRet {
  code: number;
  data: null;
  msg: string;
}

export interface editSealTypeParams {
  sealTypeId: number;
  sealTypeCode: string;
  sealTypeName: string;
  userType: USERTYPE;
}

export interface sealStatusRet {
  code: number;
  data: null;
  msg: string;
}
export interface sealStatusParams {
  sealTypeId: number; // 印章类型ID
}

export interface sealTypeListNoPageRet {
  code: number;
  data: Array<sealTypeItem>;
  msg: string;
}
const enum USERTYPE {
  Org = 1,
  Person = 2
}