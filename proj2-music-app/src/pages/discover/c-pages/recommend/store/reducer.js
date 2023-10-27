
import { Map } from 'immutable'
import * as actionTypes from './constants'
// TODO 1. 改进
const defaultState = Map({
    topBanners: []
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
        default:
            return state
    }
}

export default reducer
