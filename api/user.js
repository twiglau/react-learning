const { http } = uni.$u
import dayjs from 'dayjs'

const config = {}
// 用户信息
export const login = (params) => http.post('/app/user/login', params, config)
