import { all } from 'redux-saga/effects';
import helloSage from './helloSaga';
import { watchIncrementAsync } from './watchIncrementAsync';

export default function* rootSage(){
    yield all([
        helloSage(),
        watchIncrementAsync()
    ])
    console.log('next sage');
}