import test from 'tape';
import { call, cps, put } from 'redux-saga/effects';
import { delay,readFile } from './utils';
import * as types from './actionTypes';
import { incrementAsync } from './sage/watchIncrementAsync';
import { readAsync } from './sage/readAsync';

test('incrementAsync saga test', function(assert){
   let gen = incrementAsync();
   assert.deepEqual(
       gen.next().value,
       call(delay, 1000),
       "第一次执行应该会返回一个延迟1秒的promise"
   );
   assert.deepEqual(
       gen.next().value,
       put({type: types.INCREMENT}),
       '应该加一'
   );
   assert.end();
});

test('readAsync saga test', function(assert){
    let gen = readAsync();
    assert.deepEqual(
        gen.next().value,
        cps(readFile,'saga.md'),
        "should equal"
    );
    assert.end();
});