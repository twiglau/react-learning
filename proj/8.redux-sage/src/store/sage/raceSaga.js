
import { cancel, take, put, fork, call, cancelled, race } from 'redux-saga/effects';

const delay = ms=>new Promise((resolve, reject)=>{
    setTimeout(()=>{resolve(ms)},ms);
});
export default function* (){
    const {a, b} = yield race({
        a: call(delay, 1000),
        b: call(delay, 2000)
    });
    console.log('a=',a,'b=',b);
}