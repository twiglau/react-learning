import * as types from '../action-types'
/**
 * 在 redux 中 动作是有规定, 规定必须有一个为 undefined type 属性, 用来表示动作类型
 * @param {*} state 
 * @param {*} action 
 */
 export default function reducer(state={number:0}, action){
      switch(action.type){
          case types.INCREMENT:
            if(action.error)action.payload.number = action.payload.number*-1;
            return {number:state.number+(action.payload?action.payload.number:1)};//返回一个加1的新状态
          case types.DECREMENT:
            return {number:state.number-(action.payload?action.payload.number:1)};//返回一个减1的新状态
          default:
            return state;    
      }
  }