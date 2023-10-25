import React, { memo, useEffect } from 'react'
import { getTopBannerAction } from './store/actionCreators'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
const Recommend = memo(() => {

    //TODO: https://blog.cjw.design/blog/frontend/react-redux
    const {topBanners} = useSelector(state => ({
        topBanners: state.recommend.topBanners
    }), shallowEqual)
    const dispatch = useDispatch()
    

    useEffect(()=> {
        dispatch(getTopBannerAction())
    },[dispatch])

    return (
        <div>Recommend {topBanners.length }</div>
    )
})


export default Recommend;
