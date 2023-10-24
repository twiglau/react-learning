import { combineReducers } from 'redux'

import { reducer as recommendReducer } from '../pages/discover/c-pages/recommend/store'

const reducers = combineReducers({
   recommend: recommendReducer
})

export default reducers

/**
 * 创建reducer,
 * 1. 使用 combineReducers 进行汇总
 */