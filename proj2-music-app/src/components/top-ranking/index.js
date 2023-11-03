import React, { memo, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { getSongDetailAction } from '@/pages/player/store'
import { TopRankingWrapper } from './style'
const TopRanking = memo((props) => {
  // props and state
  const { info } = props

  // redux hooks
  const dispatch = useDispatch()
  const items = useMemo(()=> {
    let items
    if(info && info.tracks) {
        const tracks = info.tracks
        let len = tracks.length > 10 ? 10 : tracks.length
        items = tracks.slice(0, len)
    } else {
        items = []
    }
    return items
  }, [info])

  // other handle
  const playMusic = (item) => {
    console.log(item.id);
    dispatch(getSongDetailAction(item.id))
  }
  return (
    <TopRankingWrapper>
        <div className='header'>
           <div className='image'>
            <img src={info && info.coverImgUrl} alt='' />
            <a href='/todo' className='image_cover'>Ranking</a>
           </div>
           <div className='info'>
            <a href='/todo'>{info && info.name}</a>
            <div>
                <button className='btn play sprite_02'></button>
                <button className='btn favor sprite_02'></button>
            </div>
           </div>
        </div>
        <div className='list'>
            {
                items.map((item,index) => {
                    return (
                        <div key={item.id} className='list-item'>
                            <div className='rank'>{index + 1}</div>
                            <div className='info'>
                                <span className='name text-nowrap'>{item.name}</span>
                                <div className='operate'>
                                    <button className='btn sprite_02 play' onClick={e => playMusic(item)}></button>
                                    <button className='btn sprite_icon2 addto'></button>
                                    <button className='btn sprite_02 favor'></button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <div className='footer'>
            <a href='/todo'>查看全部 &gt;</a>
        </div>
    </TopRankingWrapper>
  )
})

export default TopRanking