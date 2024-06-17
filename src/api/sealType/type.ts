export interface sealTypeRet {
  code: number;
  data: Array<{ id: number; sealTypeCode: string; sealTypeName: string; status: number }>;
  msg: string;
}

export interface sealTypeParams {
  // current: number;
  // limit: number;
}
