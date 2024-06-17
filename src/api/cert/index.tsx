import axios from "@/api";
import {
  certListRet,
  certListParams,
  registerCertRet,
  registerCertParams,
  deleteCertRet,
  deleteCertParams,
  changeStatusCertRet,
  changeStatusCertParams
} from "./type";

const { get, post } = axios("");

/**  获取证书列表 */
export const getCertList = (data: certListParams) =>
  get<certListRet>("ukey_cert/list", data);

/**  证书注册 */
export const registerCert = (data: registerCertParams) =>
  post<registerCertRet>("ukey_cert/register", data);

/**  证书删除 */
export const deleteCert = (data: deleteCertParams) =>
  post<deleteCertRet>("ukey_cert/delete", data);

/**  修改证书状态 */
export const changeStatusCert = (data: changeStatusCertParams) =>
  post<changeStatusCertRet>("ukey_cert/enableOrDisable", data);