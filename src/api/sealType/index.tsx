import axios from '@/api'
import {
  AddSealTypeParams,
  EditSealTypeParams,
  SealStatusParams,
  SealTypeListNoPageRet,
  SealTypeParams,
  SealTypeRet
} from './type'

const { get, post } = axios('sealType')

/**  获取印章类型列表数据 */
export const getSealTypeList = (data: SealTypeParams) => get<SealTypeRet>('page', data)

/**  新增印章类型 */
export const addSealType = (data: AddSealTypeParams) => post('add', data)

/**  编辑印章类型 */
export const editSealType = (data: EditSealTypeParams) => post('edit', data)

/**  修改印章类型状态 */
export const changeSealTypeStatus = (data: SealStatusParams) => post('enableOrDisable', data)

/**  获取启用的印章类型列表(不分页) */
export const getSealTypeListNoPage = (data: any) => get<SealTypeListNoPageRet>('list/enable', data)
