// 引入配置
import config from '@/util/config'
// 引入拦截器配置
import {requestInterceptors,responseInterceptors} from './interceptors.js'
//  初始化请求配置
const initRequest=(vm)=>{
	uni.$u.http.setConfig((defaultConfig) => {
		/* defaultConfig 为默认全局配置 */
		defaultConfig.baseURL = config.baseUrl /* 根域名 */
		defaultConfig.header['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
		return defaultConfig
	})
	requestInterceptors()
	responseInterceptors()
}
export {
	initRequest
}




