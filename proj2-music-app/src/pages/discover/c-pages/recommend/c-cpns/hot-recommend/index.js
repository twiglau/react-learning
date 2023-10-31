import React, { memo, useEffect } from 'react'
import ThemeHeaderRCM from '@/components/theme-header-rcm'
import SongCover from '@/components/song-cover'
import { HotRecommendWrapper } from './style'

import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getHotRecommendAction } from '../../store/actionCreators'
const HotRecommend = memo(() => {

  const { hotRecommends } = useSelector(state => ({
    hotRecommends: state.getIn(['recommend','hotRecommends'])
  }), shallowEqual)
  const dispatch = useDispatch()


  useEffect(()=> {
    dispatch(getHotRecommendAction(8))
  }, [dispatch])
  return (
    <HotRecommendWrapper>
      <ThemeHeaderRCM title="推荐" keywords={['华语','流行', '摇滚', '民谣', '电子']} />
      <div className='recommend-list'>
        {
          hotRecommends.map(ele => <SongCover info={ele} key={ele.name} />)
        }
      </div>
    </HotRecommendWrapper>
  )
})

export default HotRecommend
