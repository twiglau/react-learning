
import { getSongDetail } from '@/services/player'
import * as actionTypes from './constants'
const changeCurrentSongAction = (currentSong) => ({
    type: actionTypes.CHANGE_CURRENT_SONG,
    currentSong
})
const changePlayListAction = (playList) => ({
    type: actionTypes.CHANGE_PLAY_LIST,
    playList
})
const changeCurrentSongIndexAction = (index) => ({
    type: actionTypes.CHANGE_CURRENT_INDEX,
    index
})
export const changeSequenceAction = (sequence) => ({
    type: actionTypes.CHANGE_SEQUENCE,
    sequence
})
export const getSongDetailAction = (ids) => {
    return (dispatch, getState) => {
        // 1. 根据id查找playlist中是否已经有了该歌曲
        const playList = getState().getIn(['player', 'playList'])
        const songIndex = playList.findIndex(song => song.id === ids)
        
        // 2. 判断是否找到了歌曲
        if(songIndex !== -1) {
            // 找到歌曲
            // 2.1
            // 2.1.1 改变索引
            dispatch(changeCurrentSongIndexAction(songIndex))
            // 2.1.2 改变正在播放的歌曲
            const song = playList[songIndex]
            dispatch(changeCurrentSongAction(song))
        } else {
            // 2.2
            // 2.2.1 请求歌曲数据
            getSongDetail(ids).then(res => {
                const song = res.songs && res.songs[0]
                if(!song) return;
                // 2.2.2 将最新请求到的歌曲添加到播放列表中
                const newPlayList = [...playList, song]
                // 2.2.3 更新Redux中的值
                dispatch(changePlayListAction(newPlayList))
                dispatch(changeCurrentSongIndexAction(newPlayList.length - 1))
                dispatch(changeCurrentSongAction(song))
            })
        }

    }
}