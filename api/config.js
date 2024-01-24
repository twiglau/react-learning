import { configUrl as baseURL } from '@/util/config'
const { http } = uni.$u
const config = { baseURL }
// 用户信息
export const login = (params) => http.post('/app/user/login', params, config)
