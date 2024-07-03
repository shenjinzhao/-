import axios from '@/api'
import { SealListParams, DeleteSealParams, MakeSealParams, SealListRet } from './type'

const { get, post } = axios('seal')

/**  获取印章列表 */
export const getSealList = (data: SealListParams) => get<SealListRet>('page', data)

/**  删除印章 */
export const deleteSeal = (data: DeleteSealParams) => post('delete', data)

/**  印章制作 */
export const makeSeal = (data: MakeSealParams) => post('make', data)
