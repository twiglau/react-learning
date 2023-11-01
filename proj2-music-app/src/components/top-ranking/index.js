import React, { memo, useMemo } from 'react'
import { getSizeImage } from '@/utils/format-utils'
import { TopRankingWrapper } from './style'
const TopRanking = memo((props) => {
  const { info } = props
  const items = useMemo(()=> {
    const tracks = info.tracks
    let items
    if(tracks) {
        let len = tracks.length > 10 ? 10 : tracks.length
        items = tracks.slice(0, len)
    } else {
        items = []
    }
    return items
  }, [info])
  return (
    <TopRankingWrapper>
        <div className='header'>
           <div className='image'>
            <img src={info.coverImgUrl} alt='' />
            <a href='/todo' className='image_cover'>Ranking</a>
           </div>
           <div className='info'>
            <a href='/todo'>{info.name}</a>
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
                                    <button className='btn sprite_02 play'></button>
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