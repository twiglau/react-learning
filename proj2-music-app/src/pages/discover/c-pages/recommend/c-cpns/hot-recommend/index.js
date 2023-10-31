import React, { memo } from 'react'
import ThemeHeaderRCM from '@/components/theme-header-rcm'
import { HotRecommendWrapper } from './style'
const HotRecommend = memo(() => {
  return (
    <HotRecommendWrapper>
      <ThemeHeaderRCM title="推荐" keywords={['华语','流行', '摇滚', '民谣', '电子']} />
    </HotRecommendWrapper>
  )
})

export default HotRecommend