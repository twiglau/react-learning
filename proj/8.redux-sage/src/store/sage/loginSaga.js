

import { cancel, take, put, fork, call, cancelled } from 'redux-saga/effects';
import * as types from '../actionTypes';
import { delay } from '../utils';
import Api from './Api';
function* login(username, password){
    try {
        Api.setItem('loading','true');
        const token = yield call(Api.login, username, password);
        yield put({type: types.LOGIN_SUCCESS,payload:token});
        Api.setItem('loading','false');
    } catch (error) {
        alert(error);
        yield put({type: types.LOGIN_ERROR, error});
        Api.setItem('loading','false');
    } finally {
        // 不管成功,或失败,都会走到这里
        if(yield cancelled()){
            Api.setItem('loading','false');
        }
    }
}

export default function*(){
    while(true){
        const {payload: {username, password}} = yield take(types.LOGIN_REQUEST);
        // const token = yield call(login,username,password);
        // 我们拿不到 Login 的返回值, 但是可以得到一个任务对象
        const task = yield fork(login, username, password);
        // fork 就相当于 开启了一个子进程, 会单独去执行而不会影响当前的主进程, 主进程会立刻向下执行

        // if(token){
            // 登录成功
            // 一旦登录成功了, 就可以开始监听退出的动作
            const logoutAction = yield take(types.LOGOUT_REQUEST);
            console.log({logoutAction});
            // 如果登录过程中,立刻点击了退出
            if(logoutAction.type === types.LOGOUT_REQUEST){
                yield cancel(task);
            }
            // 派发一个退出陈宫的动作, 把 token 删除掉
            yield put({type: types.LOGOUT_SUCCESS})
        // }
    }
}
