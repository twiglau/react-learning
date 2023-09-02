import { reducer as counterReducer } from './counter';
import { reducer as homeReducer } from './home';

import { combineReducers } from 'redux'

// 1. 手动编辑
// function reducer(state = {}, action) {
//     return {
//         counterInfo: counterReducer(state.counterInfo, action),
//         homeInfo: homeReducer(state.homeInfo, action)
//     }
// }
// 缺点：
// 1.1 如果传入的action什么都没有做，reducer没有必要返回一个新的对象

// 2. combineReducers 返回值是一个reducer纯函数
const reducer = combineReducers({
    counterInfo: counterReducer,
    homeInfo: homeReducer
})

export default reducer

// combineReducers 实现
// 1. Object.keys 拿到key [counterInfo, homeInfo]
// 2. 遍历Key, 放到 finalReducers里面
// if(typeof reducers[key] === 'function') {
//     finalReducers[key] = reducers[key]
// }

// 3.返回 combination(state = {}, action) {} 函数
// 判断state是否发生改变，有改变，则返回新的state,如没有，返回旧的state

