import { takeEvery, put } from 'redux-saga/effects';
import * as types from '../actionTypes';
import { delay } from '../utils';
function* incrementAsync(){
    // 当 yield 一个 promise 时候, saga 中间件可以接受到这个 promise,它会等待这个promise完成
    let msg = yield delay(3000);
    console.log('msg',msg);
    //再次向仓库派发 INCREMENT 动作
    yield put({type: types.INCREMENT})
}

/**
 * 1. rootSage 入口sage 是用来组织和调用别的 sage generator 的
 * 2. 监听sage 监听向仓库派发的动作的, 如果监听到某些动作的话,会通知
 * worker 去执行
 * 3. worker saga 真正干活的saga, 真正执行任务的 saga
 */
export function* watchIncrementAsync(){
    // 监听每一次的 ASYNC_INCREMENT 动作, 每次当有人向仓库派发这个动作的时候,就是
    // 调用另一个 worker sage 动作

    // 每当yield一个值, 一般被称为 effect, 就相当于告诉 saga 中间件进行某些处理
    yield takeEvery(types.ASYNC_INCREMNET, incrementAsync);
}