import { all, race } from 'redux-saga/effects';

import helloSage from './helloSaga';
import { watchIncrementAsync2,watchAndLog } from './watchIncrementAsync2';
import { readAsync } from './readAsync';
import loginSaga from './loginSaga'
import raceSaga from './raceSaga';
import race2Saga from './race2Saga';
export default function* rootSage(){
    yield all([
        race2Saga()
    ])
}