import * as actionTypes from './constants';
import { getTopBanners, getHotRecommends,getNewAlbums } from '@/services/recommend'


const changeTopBannerAction = (res) => ({
    type: actionTypes.CHANGE_TOP_BANNERS,
    topBanners: res.banners
})
const changeHotRecommendAction = (res) => ({
    type: actionTypes.CHANGE_HOT_RECOMMEND,
    hotRecommends: res.result
})
const changeNewAlbumAction = (res) => ({
    type: actionTypes.CHANGE_NEW_ALBUM,
    newAlbums: res.weekData
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

export const getHotRecommendAction = (limit) => {
    return dispatch => {
        // 网络请求
        getHotRecommends(limit).then(res => {
            dispatch(changeHotRecommendAction(res))
        })
    }
}
export const getNewAlbumAction = (limit) => {
    return dispatch => {
        getNewAlbums(limit).then(res => {
            dispatch(changeNewAlbumAction(res))
        })
    }
}