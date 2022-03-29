
import { createStore,applyMiddleware } from 'redux';
import reducers from './reducers';

//1.  let store = createStore(reducers,{counter1: 10, counter2: 10});
//2.  let store = createStore(reducers);
//3.  中间件
// let logger = store =>dispatch=>action=>{
//     console.log('老状态',store.getState());
//     dispatch(action);
//     console.log('新状态',store.getState());
// }
function logger(store){
    return function(dispatch){
        return function(action){
            console.log('老状态',store.getState());
            dispatch(action);
            console.log('新状态',store.getState());
        }
    }
}
let store = applyMiddleware(logger)(createStore)(reducers);
// 1. 需求: 修改 dispatch 方法
// let dispatch = store.dispatch; // 缓存老的原始的派发方法
// store.dispatch = function(action){
//     console.log('老状态',store.getState());
//     dispatch(action);
//     console.log('新状态',store.getState());
// }
// 2. 中间件

export default store;