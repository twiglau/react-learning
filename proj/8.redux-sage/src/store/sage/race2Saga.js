
import { cancel, take, put, fork, call, cancelled, race } from 'redux-saga/effects';
import * as types from '../actionTypes';
const delay = ms=>new Promise((resolve, reject)=>{
    setTimeout(()=>{resolve(ms)},ms);
});

function * start(){
    while(true){
        yield call(delay, 1000);
        yield put({type: types.INCREMENT});
    }
}
export default function* (){
    yield race({
        start:call(start),
        // 如果监听到了 CANCEL_COUNTER 动作, 则表示当前任务完成.
        stop:take(types.CANCEL_COUNTER)
    })
}