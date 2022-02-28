# 为何需要不可变数据  
1. 性能优化  
2. 易于调试和跟踪  
3. 易于推测  

# 如何操作不可变数据  
1. 原生写法: { ... }, Object.assign  
```
const state = { filter: 'completed', todos: [
    'Learn React'
]};

const newState = { ...state, todos: [
    ...state.todos,
    'Learn Redux'
]};

const newStates = Object.assign({}, state, { todos: [
    ...state.todos,
    'Learn Redux'
]});
```  
2. immutability-helper  更新的节点非常的深  
```
import update from 'immutability-helper';
const state = { filter: 'completed', todos: [
    'Learn React'
]};

const newState = update(state, { todos: {$push: ['Learn Redux']}});

```
3. immer  
```
import produce from 'immer';

const state = { filter: 'completed', todos: [
    'Learn React'
]};

const newState = produce(state, draftState => {
    draftState.todos.push('Learn Redux.');
})
```  
