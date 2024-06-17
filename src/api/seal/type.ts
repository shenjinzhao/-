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
export interface sealListRet {
  code: number;
  data: data;
  msg: string;
}

export interface sealListParams {
  current: number;
  limit: number;
}


export interface deleteSealRet {
  code: number;
  data: null;
  msg: string;
}

export interface deleteSealParams {
  sealTypeCode: string;
  sealTypeName: string;
}
export interface makeSealRet {
  code: number;
  data: null;
  msg: string;
}
export interface makeSealParams {
  sealTypeId: number; // 印章类型ID
}