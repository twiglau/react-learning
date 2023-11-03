import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Slider } from 'antd'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { 
  getSongDetailAction, 
  changeSequenceAction, 
  changeCurrentSong
} from '../store/actionCreators'
import { getSizeImage, formatMinuteSecond, getPlaySong } from '@/utils/format-utils'
import { 
    PlayerBarWrapper,
    Control,
    PlayInfo,
    Operator
} from './style'
const AppPlayerBar = memo(() => {
  // props 和 state
  const [currentTime, setCurrentTime ] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isChanging, setIsChanging] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const {
    currentSong,
    sequence
  } = useSelector(state => ({
    currentSong: state.getIn(['player','currentSong']),
    sequence: state.getIn(['player', 'sequence'])
  }),shallowEqual)
  const dispatch = useDispatch()
  // other hook
  const audioRef = useRef()
  useEffect(()=> {
     dispatch(getSongDetailAction(167876))
  }, [dispatch])
  useEffect(() => {
    audioRef.current.src = getPlaySong(currentSong.id)
  }, [currentSong])

  // other handle
  const picUrl = currentSong && currentSong.al && currentSong.al.picUrl
  const singer = currentSong && currentSong.ar && currentSong.ar.length && currentSong.ar[0].name
  const duration = currentSong.dt || 0
  const showDuration = formatMinuteSecond(duration)
  const showCurrentTime = formatMinuteSecond(currentTime)

  // 可能主动发生改变，并且引起UI重绘
//   let progress = currentTime / duration * 100;

  // hanlde function
  const playMusic = useCallback(()=> {
    isPlaying ? audioRef.current.pause() : audioRef.current.play()
    setIsPlaying(!isPlaying)
  }, [isPlaying])
  // 1. 歌曲播放时， 改变进度
  const updateTime = (e) => {
    if(!isChanging){
        setCurrentTime(e.target.currentTime*1000)
        setProgress(currentTime/ duration * 100)
    }
  }
  // 2. 拖动时， 改变进度: 1,2 冲突，需增变量 isChanging 控制
  const sliderChange = useCallback((value)=> {
      // 改变当前显式时间
      setIsChanging(true)
      setProgress(value)
  }, [])
  const slierAfterChange = useCallback((value) => {
    // 松开后，改变音乐播放进度
    const currentTime = value / 100 * duration / 1000
    audioRef.current.currentTime = currentTime;
    setCurrentTime(currentTime * 1000)
    setIsChanging(false)

    if(!isPlaying) {
        playMusic()
    }
  }, [duration, isPlaying, playMusic])

  // 切换歌曲播放顺序： 随机/单曲/顺序 播放
  const changeSequence = () => {
      let currentSequence = sequence + 1
      if(currentSequence > 2) {
        currentSequence = 0
      }
      dispatch(changeSequenceAction(currentSequence))
  }
  const changeMusic = (tag) => {
      dispatch(changeCurrentSong(tag))
  }

  return (
    <PlayerBarWrapper className='sprite_playbar'>
        <div className='content wrap-v2'>
            <Control isPlaying={isPlaying}>
                <button className='sprite_playbar prev' onClick={e => changeMusic(-1)}></button>
                <button className='sprite_playbar play' onClick={e => playMusic()}></button>
                <button className='sprite_playbar next' onClick={e => changeMusic(1)}></button>
            </Control>
            <PlayInfo>
                <div className='image'>
                    <NavLink to='/discover/player'>
                        <img src={getSizeImage(picUrl, 35)} alt='' />
                    </NavLink>
                </div>
                <div className='info'>
                    <div className='song'>
                        <span className='song-name'>{currentSong.name}</span>
                        <a className='singer-name' href='/#'>{singer}</a>
                    </div>
                    <div className='progress'>
                        <Slider  
                        defaultValue={0} 
                        value={progress} 
                        onAfterChange={e => slierAfterChange} 
                        onChange={e => sliderChange}/>
                        <div className='time'>
                            <span className='now-time'>{showCurrentTime}</span>
                            <span className='divider'>/</span>
                            <span>{showDuration}</span>
                        </div>
                    </div>
                </div>
            </PlayInfo>
            <Operator sequence={sequence}>
                <div className='left'>
                    <button className='sprite_playbar btn favor'></button>
                    <button className='sprite_playbar btn share'></button>
                </div>
                <div className='right sprite_playbar'>
                    <button className='sprite_playbar btn volume'></button>
                    <button className='sprite_playbar btn loop' onClick={e => changeSequence()}></button>
                    <button className='sprite_playbar btn playlist'></button>
                </div>
            </Operator>
        </div>
        <audio ref={audioRef} onTimeUpdate={e => updateTime(e)} />
    </PlayerBarWrapper>
  )
})

export default AppPlayerBar