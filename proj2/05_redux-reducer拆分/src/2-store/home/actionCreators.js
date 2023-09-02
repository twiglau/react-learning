import { CHANGE_BANNERS, CHANGE_RECOMMEND, FETCH_HOME_MULTI_DATA } from './constant'
import axios from 'axios'

// 轮播图和推荐
export const changeBannersAction = (banners) => ({
    type: CHANGE_BANNERS,
    banners
})
export const changeRecommendAction = (recommends) => ({
    type: CHANGE_RECOMMEND,
    recommends
})

// redux-thunk中定义的ACTION 函数
export const getHomeMultiDataAction = (dispatch, getState) => {
    console.log("action中的函数: ", getState())
    axios({
      url: 'http://123.207.32.32:8000/home/multidata'
    }).then(res => {
      const data = res.data.data;
      dispatch(changeBannersAction(data.banner.list))
      dispatch(changeRecommendAction(data.recommend.list))
    })
}

// redux-saga拦截的action
export const fetchHomeMultiDataAction = {
    type: FETCH_HOME_MULTI_DATA
}