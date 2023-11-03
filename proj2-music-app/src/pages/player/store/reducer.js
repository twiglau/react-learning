import { Map } from 'immutable'
import * as actionTypes from './constants'
const defaultState = Map({
    playList:[],  // 播放列表
    currentSongIndex:0,  // 当前歌曲在列表中索引
    currentSong:{}, // 当前歌曲的信息
    sequence: 0, // 0 循环  1 随机  2 单曲
})

export default function reducer(state = defaultState, action) {
    switch(action.type) {
        case actionTypes.CHANGE_CURRENT_SONG:
            return state.set('currentSong', action.currentSong)
        case actionTypes.CHANGE_PLAY_LIST:
            return state.set('playList', action.playList)
        case actionTypes.CHANGE_CURRENT_INDEX:
            return state.set('currentSongIndex', action.index)
        case actionTypes.CHANGE_SEQUENCE:
            return state.set('sequence', action.sequence)
        default:
            return state
    }
}