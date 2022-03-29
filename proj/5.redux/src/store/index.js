
import { createStore,applyMiddleware } from '../redux';
import reducers from './reducers';
import logger1 from '../redux-logger';
import logger2 from '../redux-logger2';
//1.  let store = createStore(reducers,{counter1: 10, counter2: 10});
//2.  let store = createStore(reducers);

/**
 * 老状态1
 * 老状态2
 * 改状态
 * 新状态2
 * 新状态1
 */
let store = applyMiddleware(logger1,logger2)(createStore)(reducers);
// 1. 需求: 修改 dispatch 方法
// let dispatch = store.dispatch; // 缓存老的原始的派发方法
// store.dispatch = function(action){
//     console.log('老状态',store.getState());
//     dispatch(action);
//     console.log('新状态',store.getState());
// }
// 2. 中间件

export default store;