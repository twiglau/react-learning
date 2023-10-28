import React, { memo, useEffect } from 'react'

import {
    RecommendWrapper
} from './style'
import TopBanner from './c-cpns/top-banner'
const Recommend = memo(() => {

    

    return (
        <RecommendWrapper>
            <TopBanner />
        </RecommendWrapper>
    )
})


export default Recommend;
