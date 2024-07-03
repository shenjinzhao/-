import axios from '@/api'
import { LoginParams } from './type'

const { post } = axios('admin')

/**  用户登录 */
export const login = (data: LoginParams) => post('login', data)

/**  用户登出 */
export const logout = () => post('logout')
