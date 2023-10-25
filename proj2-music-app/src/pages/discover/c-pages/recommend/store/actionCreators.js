import * as actionTypes from './constants';
import { getTopBanners } from '@/services/recommend'


const changeTopBannerAction = (res) => ({
    type: actionTypes.CHANGE_TOP_BANNERS,
    topBanners: res.banners
})
// 函数本身 返回另外一个函数
// 第一个函数可能配置些参数 如： pageNo, pageSize 等
export const getTopBannerAction = ()=> {
    return dispatch => {
        // 网络请求
        getTopBanners().then(res => {
            dispatch(changeTopBannerAction(res))
        })
    }
}