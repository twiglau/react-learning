

import { takeEvery, take, put, select, call } from 'redux-saga/effects';
import * as types from '../actionTypes';
import { delay } from '../utils';
import Api from './Api';
function* login(username, password){
    try {
        const token = yield call(Api.login, username, password);
        return token;
    } catch (error) {
        alert(error);
        yield put({type: types.LOGIN_ERROR, error});
    }

}

export default function*(){
    while(true){
        const {payload: {username, password}} = yield take(types.LOGIN_REQUEST);
        const token = yield call(login,username,password);
        if(token){
            // 登录成功
            yield put({type: types.LOGIN_SUCCESS,payload:token});
            // 一旦登录成功了, 就可以开始监听退出的动作
            const logoutAction = yield take(types.LOGOUT_REQUEST);
            console.log({logoutAction});
            // 派发一个退出陈宫的动作, 把 token 删除掉
            yield put({type: types.LOGOUT_SUCCESS})
        }
    }
}
