import React, { memo, useEffect } from 'react'
import { getTopBannerAction } from './store/actionCreators'
import { createSelectorHook, useDispatch, useSelector } from 'react-redux'
const Recommend = memo(() => {

    const getRecommendState = createSelectorHook(
        state => state.recommend,
        ({topBanners}) => topBanners,
    );
    //TODO: useSelector 更换写法了
    const {topBanners} = useSelector(state => ({
        topBanners: state.recommend.topBanners
    }))
    const dispatch = useDispatch()
    

    useEffect(()=> {
        dispatch(getTopBannerAction())
    },[dispatch])

    return (
        <div>Recommend {topBanners.length }</div>
    )
})


export default Recommend;
