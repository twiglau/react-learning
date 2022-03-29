import * as types from './action-types'
/**
 * 在 redux 中 动作是有规定, 规定必须有一个为 undefined type 属性, 用来表示动作类型
 * @param {*} state 
 * @param {*} action 
 */
 export default function reducer(state, action){
    switch(action.type){
      case types.INCREMENT:
        return state + 1; // 返回一个加1的新状态
      case types.DECREMENT:
        return state - 1; // 
      default:
        return state;
    }
  }