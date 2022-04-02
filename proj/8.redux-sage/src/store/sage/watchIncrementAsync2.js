import { takeEvery, take, put, select } from 'redux-saga/effects';
import * as types from '../actionTypes';
import { delay } from '../utils';

export function* watchAndLog(){
    while(true){
        let action = yield take('*');
        console.log(action);
        // 如果在 saga 中获取最新的状态树?
        // 参数选择某个状态
        const state = yield select(state=>state.counter);
        console.log('newest state',state);
    }
}

export function* watchIncrementAsync2(){
    for(let i=0;i<3;i++){
        // take 监听一次 ASYNC_INCREMENT动作, 如果有人向仓库派发了 ASYNC_INCREMENT 动作,
        // 向下继续派发
        const action = yield take(types.ASYNC_INCREMNET);
        console.log(action);
        yield put({type: types.INCREMENT});
    }
    alert('最多执行三次');
}