import React, { memo, useEffect } from 'react'

import {
    RecommendWrapper,
    Content,
    RecommendLeft,
    RecommendRight
} from './style'
import TopBanner from './c-cpns/top-banner'
import HotRecommend from './c-cpns/hot-recommend'
import NewAlbum from './c-cpns/new-album'
import RecommendRanking from './c-cpns/rmc-ranking'
const Recommend = memo(() => {

    return (
        <RecommendWrapper>
            <TopBanner />
            <Content className='wrap-v2'>
                <RecommendLeft>
                  <HotRecommend></HotRecommend>
                  <NewAlbum />
                  <RecommendRanking />
                </RecommendLeft>
                <RecommendRight></RecommendRight>
            </Content>
        </RecommendWrapper>
    )
})


export default Recommend;
