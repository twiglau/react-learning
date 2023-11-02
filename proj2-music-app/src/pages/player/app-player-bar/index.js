import React, { memo, useEffect, useRef } from 'react'
import { Slider } from 'antd'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getSongDetailAction } from '../store/actionCreators'
import { getSizeImage, formatMinuteSecond, getPlaySong } from '@/utils/format-utils'
import { 
    PlayerBarWrapper,
    Control,
    PlayInfo,
    Operator
} from './style'
const AppPlayerBar = memo(() => {

  const {currentSong} = useSelector(state => ({
    currentSong: state.getIn(['player','currentSong'])
  }),shallowEqual)
  const dispatch = useDispatch()
  // other hook
  const audioRef = useRef()
  useEffect(()=> {
     dispatch(getSongDetailAction(167876))
  }, [dispatch])

  // other handle
  const picUrl = currentSong && currentSong.al && currentSong.al.picUrl
  const singer = currentSong && currentSong.ar && currentSong.ar.length && currentSong.ar[0].name
  const duration = currentSong.dt || 0
  const showDuration = formatMinuteSecond(duration)

  // hanlde function
  const playMusic = ()=> {
    audioRef.current.src = getPlaySong(currentSong.id)
    audioRef.current.play()
  }
  return (
    <PlayerBarWrapper className='sprite_playbar'>
        <div className='content wrap-v2'>
            <Control>
                <button className='sprite_playbar prev'></button>
                <button className='sprite_playbar play' onClick={e => playMusic()}></button>
                <button className='sprite_playbar next'></button>
            </Control>
            <PlayInfo>
                <div className='image'>
                    <a href='/#'>
                        <img src={getSizeImage(picUrl, 35)} alt='' />
                    </a>
                </div>
                <div className='info'>
                    <div className='song'>
                        <span className='song-name'>{currentSong.name}</span>
                        <a className='singer-name' href='/#'>{singer}</a>
                    </div>
                    <div className='progress'>
                        <Slider  defaultValue={30}/>
                        <div className='time'>
                            <span className='now-time'>1:30</span>
                            <span className='divider'>/</span>
                            <span>{showDuration}</span>
                        </div>
                    </div>
                </div>
            </PlayInfo>
            <Operator>
                <div className='left'>
                    <button className='sprite_playbar btn favor'></button>
                    <button className='sprite_playbar btn share'></button>
                </div>
                <div className='right sprite_playbar'>
                    <button className='sprite_playbar btn volume'></button>
                    <button className='sprite_playbar btn loop'></button>
                    <button className='sprite_playbar btn playlist'></button>
                </div>
            </Operator>
        </div>
        <audio ref={audioRef} />
    </PlayerBarWrapper>
  )
})

export default AppPlayerBar