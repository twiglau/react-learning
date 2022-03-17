# 理解 Store  
```
const store = createStore(reducer)
```  
1. getState()  得到当前数据
2. dispatch(action) dispatch 一个 action  
3. subscribe(listener)  监听 store 的变化  
4. Reducer 真正处理一个 action  更新Store  

# 理解 action  
```
{
    type: ADD_TODO,
    text: 'Build my first Redux app'
}
```  

# 理解 reducer  
* initailState 为Store的初始值  
* 所有的 reducer 会接收到 所有的 action
```
function todoApp(state = initialState, action) {
    switch(action.type) {
        case ADD_TODO:
            return Object.assign({}, state, {
                todos: [
                    ...state.todos,
                    {
                        text: action.text,
                        completed: false
                    }
                ]
            })
        default:
            return state  

    }
}
```  
# Redux 的流程  
```
//UI
1. 发生事件点击  

//Actions  
2. 产生 action, 会被 dispatch 出去  

//Store
3. Reducer 接收到 dispatch 的 action  从而形成新的 state, 更新 Store  

//UI
4. Store 更新, 然后更新 UI
```  

# 理解 combineReducers  
* 如果系统中有多个 reducer ,该如何组合到一起来使用  
```
// 1. reducer
export default function todos(state = [], action) {
    switch (aciton.type) {
        case 'ADD_TODO':
          return state.concat([action.text])
        default:
          return state
    }
}
```  
------------
```
//2. reducer
export default function counter(state = 0, aciton) {
    switch (action.type) {
        case 'INCREMENT':
          return state + 1
        case 'DECRMENT':
          return state - 1
        default:
          return state
    }
}
```  
-------------
```
//3. combine  
import { combineReducers } from 'redux'
import todos from './todos'
import counter from './counter'

export default combineReducers({
    todos,
    counter
})
```  

# 理解 bindActionCreators  
```
// 方法: 1
function addTodoWithDispatch(text) {
    const action = {
        type: ADD_TODO,
        text
    }
    dispatch(action)
}
```   
-----------
```
// 方法: 2
dispatch(addTodo(text))
dispatch(completeTodo(index))
```  
-------------

```
// 方法: 3 简化流程  
const boundAddTodo = text => dispatch(addTodo(text))
const boundCompleteTodo = index => dispatch(completeTodo(index))  
```  
