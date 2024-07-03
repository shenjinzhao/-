import axios from '@/api'
import {
  CertListParams,
  CertListRet,
  ChangeStatusCertParams,
  DeleteCertParams,
  RegisterCertParams
} from './type'

const { get, post } = axios('ukey_cert')

/**  获取证书列表 */
export const getCertList = (data: CertListParams) => get<CertListRet>('list', data)

/**  证书注册 */
export const registerCert = (data: RegisterCertParams) => post('register', data)

/**  证书删除 */
export const deleteCert = (data: DeleteCertParams) => post('delete', data)

/**  修改证书状态 */
export const changeStatusCert = (data: ChangeStatusCertParams) => post('enableOrDisable', data)
