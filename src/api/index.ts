import { create } from 'sdzm-axios'
import { serviceInterceptors } from './interceptors'
const { insertPrefix, service } = create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 3 * 60 * 1000
})
serviceInterceptors(service)
export default insertPrefix
