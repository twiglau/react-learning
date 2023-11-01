import React, { memo } from 'react'

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
import ResidentSinger from './c-cpns/resident-singer'
import PopularAnchor from './c-cpns/popular-anchor'
import UserLogin from './c-cpns/user-login'
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
                <RecommendRight>
                    <UserLogin></UserLogin>
                    <ResidentSinger></ResidentSinger>
                    <PopularAnchor></PopularAnchor>
                </RecommendRight>
            </Content>
        </RecommendWrapper>
    )
})


export default Recommend;
