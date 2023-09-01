import { Add_NUMBER, SUB_NUMBER, INCREMENT, DECREMENT, CHANGE_BANNERS, CHANGE_RECOMMEND } from './constants'
import axios from 'axios'

export const addAction = num=> ({
    type: Add_NUMBER,
    num
})
export const subAction = num => ({
    type: SUB_NUMBER,
    num
})
export const incAction = () => ({
    type: INCREMENT
})
export const decAction = () => ({
    type: DECREMENT
})


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