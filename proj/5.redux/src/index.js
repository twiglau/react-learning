import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './components/Counter';
import Counter1 from './components/Counter1';
import Counter2 from './components/Counter2';
import { Provider } from 'react-redux'
import store from './store';
ReactDOM.render(
<>
<Provider store={store}>
 <Counter />
</Provider>
</>, 
document.getElementById('root'))

/**
 * Redux 三大原则
 * 1. 整个应用的 state 被储存在一颗 object tree 中, 并且这个 object tree 只存在唯一一个 store 中
 * 2. State 是只读的, 唯一改变 state 的方法就是触发 action, action 是一个用于描述已发生事件的普通对象.
 * 使用纯函数来执行修改, 为了描述 action 如何改变 state tree, 你需要辫子额 reducers
 * 3. 单一数据源的设计让 React的组件之间的通信更加方便, 同时也便于状态的统一管理
 */