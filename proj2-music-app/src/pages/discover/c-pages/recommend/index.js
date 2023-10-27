import React, { memo, useEffect } from 'react'
import { getTopBannerAction } from './store/actionCreators'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
const Recommend = memo(() => {

    //TODO: https://blog.cjw.design/blog/frontend/react-redux
    const {topBanners} = useSelector(state => ({
        //TODO 3. 改进 取值修改
        // topBanners: state.recommend.get("topBanners")

        // TODO 5. 改进 state 合并
        // topBanners: state.get("recommend").get("topBanners")
        // 等价写法 =>
        topBanners: state.getIn(["recommend", "topBanners"])
        
        // topBanners: state.recommend.topBanners
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
