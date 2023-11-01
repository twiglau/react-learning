import * as actionTypes from './constants';
import { 
    getTopBanners, 
    getHotRecommends,
    getNewAlbums,
    getTopList,
    getArtistList
 } from '@/services/recommend'


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
const changeUpRankingAction = (res) => ({
    type: actionTypes.CHANGE_UP_RANKING,
    upRanking: res.playlist
})
const changeNewRankingAction = (res) => ({
    type: actionTypes.CHANGE_NEW_RANKING,
    newRanking: res.playlist
})
const changeOriginRankingAction = (res) => ({
    type: actionTypes.CHANGE_ORIGIN_RANKING,
    originRanking: res.playlist
})
const changeResidentSingerAction = (res) => ({
    type: actionTypes.CHANGE_RESIDENT_SINGER,
    residentSinger: res.artists
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

export const getTopListAction = (idx) => {
    return dispatch => {
         getTopList(idx).then(res => {
            switch(idx) {
                case 19723756:
                    dispatch(changeUpRankingAction(res));
                    break;
                case 3779629:
                    dispatch(changeNewRankingAction(res));
                    break;
                case 2884035:
                    dispatch(changeOriginRankingAction(res));
                    break;
                default:
                    break;
            }
         })
    }
}

export const getResidentSingerAction = ()=> {
    return dispatch => {
        getArtistList(5, 5001).then(res => {
            dispatch(changeResidentSingerAction(res))
        })
    }
}