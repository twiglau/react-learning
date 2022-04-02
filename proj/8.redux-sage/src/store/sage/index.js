import { all } from 'redux-saga/effects';

import helloSage from './helloSaga';
import { watchIncrementAsync2,watchAndLog } from './watchIncrementAsync2';
import { readAsync } from './readAsync';
import loginSaga from './loginSaga'
export default function* rootSage(){
    yield all([
        loginSaga()
    ])
}