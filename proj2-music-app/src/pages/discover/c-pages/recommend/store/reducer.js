
import { Map } from 'immutable'
import * as actionTypes from './constants'
// TODO 1. 改进
const defaultState = Map({
    topBanners: [],
    hotRecommends: [],
    newAlbums: []
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
        default:
            return state
    }
}

export default reducer
