import { cps } from 'redux-saga/effects';
import { readFile } from '../utils';
export function* readAsync(){
    // call 只能调动 promise 写法, 不支持 callback 函数
    let content = yield cps(readFile, 'saga.md');
    console.log(content);
}