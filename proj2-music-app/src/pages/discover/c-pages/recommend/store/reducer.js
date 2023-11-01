
import { Map } from 'immutable'
import * as actionTypes from './constants'
// TODO 1. 改进
const defaultState = Map({
    topBanners: [],
    hotRecommends: [],
    newAlbums: [],
    upRanking:{},
    newRanking:{},
    originRanking:{},
    residentSinger:[]
})
// const defaultState = {
//     topBanners:[]
// }

function reducer(state = defaultState, action) {
    switch(action.type) {
        case actionTypes.CHANGE_TOP_BANNERS:
            // TODO 2. 改进 修改
            return state.set("topBanners", action.topBanners)
            // return {...state,topBanners:action.topBanners}
        case actionTypes.CHANGE_HOT_RECOMMEND:
            return state.set('hotRecommends', action.hotRecommends)
        case actionTypes.CHANGE_NEW_ALBUM:
            return state.set('newAlbums', action.newAlbums)
        case actionTypes.CHANGE_NEW_RANKING:
            return state.set('newRanking', action.newRanking)
        case actionTypes.CHANGE_UP_RANKING:
            return state.set('upRanking', action.upRanking)
        case actionTypes.CHANGE_ORIGIN_RANKING:
            return state.set('originRanking', action.originRanking)
        case actionTypes.CHANGE_RESIDENT_SINGER:
            return state.set('residentSinger', action.residentSinger)
        default:
            return state
    }
}

export default reducer
