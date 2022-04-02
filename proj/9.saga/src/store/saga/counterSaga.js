import { take, put } from '../../redux-saga/effects';
import * as types from '../actionTypes';
import { delay } from '../utils';

export default function* (){
    console.log('开始执行 counterSage.js');
    for(let i=0;i<3;i++){
        // take 监听一次 ASYNC_INCREMENT动作, 如果有人向仓库派发了 ASYNC_INCREMENT 动作,
        // 向下继续派发
        const action = yield take(types.ASYNC_INCREMNET);
        console.log(action);
        yield put({type: types.INCREMENT});
        /**
         * 对应: 
         * dispatch(effect.action);
         * next();
         */
        console.log('执行完成一次循环');
    }
    alert('最多执行三次');
}