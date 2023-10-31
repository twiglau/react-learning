import React, { memo, useEffect } from 'react'

import {
    RecommendWrapper,
    Content,
    RecommendLeft,
    RecommendRight
} from './style'
import TopBanner from './c-cpns/top-banner'
import HotRecommend from './c-cpns/hot-recommend'
const Recommend = memo(() => {

    

    return (
        <RecommendWrapper>
            <TopBanner />
            <Content>
                <RecommendLeft>
                  <HotRecommend></HotRecommend>
                </RecommendLeft>
                <RecommendRight></RecommendRight>
            </Content>
        </RecommendWrapper>
    )
})


export default Recommend;
