
import store from './store/index'
import { addAction, subAction } from './store/actionCreators'

// 需求： 每次 dispatch 时，打印当前的action,以及dispatch后，state 的值

// 1. 基本需求
// console.log("dispatch前 -action:", addAction(10))
// store.dispatch(addAction(10))
// console.log('dispatch后 -state:', store.getState())
// console.log("dispatch前 -action:", addAction(5))
// store.dispatch(addAction(5))
// console.log('dispatch后 -state:', store.getState())

// 2. 封装一个函数
// function dispatchAndLogging(action) {
//     console.log("dispatch前 -action:", action)
//     store.dispatch(action)
//     console.log('dispatch后 -state:', store.getState())
// }

// dispatchAndLogging(addAction(10));
// dispatchAndLogging(addAction(5));

// 以上使用方法并不友好
// 3. 函数的基础上进行优化: 修改原有的dispatch
// hack技术： monkeying-patch
// const next = store.dispatch
// function dispatchAndLogging(action) {
//     console.log("dispatch前 -action:", action)
//     next(action)
//     console.log('dispatch后 -state:', store.getState())
// }
// store.dispatch = dispatchAndLogging;

// store.dispatch(addAction(10));
// store.dispatch(addAction(5));

// 4. 将之前的操作进行封装
export function patchLogging(store) {
    const next = store.dispatch
    function dispatchAndLogging(action) {
        console.log("dispatch前 -action:", action)
        next(action)
        console.log('dispatch后 -state:', store.getState())
    }
    // store.dispatch = dispatchAndLogging;
    return dispatchAndLogging
}


// 5. 封装类似redux-thunk的功能
function patchThunk(store) {
    const next = store.dispatch;
    function dispatchAndThunk(action) {
        if(typeof action === 'function') {
            action(store.dispatch, store.getState)
        } else {
            next(action);
        }
    }
    // store.dispatch = dispatchAndThunk;
    return dispatchAndThunk;
}

// 只要调用 patchLogging 函数
// store.dispatch 就会被修改掉
// patchLogging(store);
// patchThunk(store);

// 1. 测试
// store.dispatch(addAction(10));
// store.dispatch(addAction(5));

// 2. 函数
// function foo(dispatch, getState) {
//     dispatch(subAction(10))
// }

// store.dispatch(foo)


// 6. 封装applyMiddleware
function applyMiddleware(store, ...middlewares) {
    const newMiddleware = [...middlewares]; // 防止修改 newMiddleware
    newMiddleware.forEach(middleware => {
        // 在这里进行修改
        store.dispatch = middleware(store)
    })
}

applyMiddleware(patchLogging, patchThunk)


