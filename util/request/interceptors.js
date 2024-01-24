
import qs from 'qs'
import dayjs from 'dayjs'
import { parseParams, Make_Encrypt,Make_Decrypt, getToken, getLang } from '@/util'
const requestInterceptors=(vm)=>{
	/**
	 * 请求拦截
	 * @param {Object} http
	 */
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		const temp = config.data || ""
		const data = qs.parse(temp)
		data.ts = dayjs().valueOf()
		config.data = parseParams(data)
		const token = getToken()
		if (token) {
			config.header['Authorization'] = token
		}
		const lang = getLang() || 'en-US'
		config.header['Accept-Language'] = lang
		config.header['Encryption'] = 0
		// let getdata = Make_Encrypt(parseParams(data_parse))
		// config.data = getdata
		// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
		// console.log(vm.$store.state);
		return config
	}, (config) => // 可使用async await 做异步操作
		Promise.reject(config))
}
const responseInterceptors=(vm)=>{
	/**
	 * 响应拦截
	 * @param {Object} http 
	 */
	uni.$u.http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data
		
		return Promise.resolve(data)
		// 自定义参数
		// const custom = response.config?.custom
		// if (data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
		// 	// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
		// 	if (custom.toast) {
		// 		uni.$u.toast(data.message)
		// 	}
		// 	// 如果需要catch返回，则进行reject
		// 	if (custom?.catch) {
		// 		return Promise.reject(data)
		// 	} else {
		// 		// 否则返回一个pending中的promise
		// 		return new Promise(() => { })
		// 	}
		// }
	}, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
		return Promise.reject(response)
	})
}


export {
	requestInterceptors,
	responseInterceptors
}


