import { combineReducers } from 'redux-immutable'
// TODO 改进 4 使用 redux-immutable 中 combineReducers
// 进行合并
// import { combineReducers } from 'redux'

import { reducer as recommendReducer } from '../pages/discover/c-pages/recommend/store'

const reducers = combineReducers({
   recommend: recommendReducer
})

export default reducers

/**
 * import { combineReducers } from 'redux'
 * 创建reducer,
 * 1. 使用 combineReducers 进行汇总
 * const reducers = combineReducers({
   recommend: recommendReducer
})
 */