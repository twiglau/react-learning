# React 的创新
* 核心原理: 当数据发生变化时, UI能够自动把变化反映出来.
* 在React之前,需要调用 DOM 的 API 来修改 DOM 树的结构, 从而改变 UI 的展现,而在有了 React 之后, 只需要在业务状态和UI状态之间建立一个绑定的关系就可以了. 绑定完成后, 就不需要再关心怎么去精细控制 UI 的变化, 因为 React 会在数据发生变化是, 帮助我们完成 UI 的变化.
```
{ text: 'message 1'}       
{ text: 'message 2'}   
---------------------
{ text: 'new message'}

      State

=> 
<ul>
  msgs.map(msg => <li>{msg.text}</li>)
</ul>

       JSX

=> 
<ul>
  <li>message 1</li>
  <li>message 2</li>
  <li>new message</li>
</ul>

       View
```  
- 以上, 可以通过 JSX 语法, 用声明式的方式来描述数据 和 UI 之间的关系, 那么数据在发生变化时, UI也会自动发生变化. 这样的话, 无论是收到一条还是多条消息, React 都会自动完成 UI 的展现, 我们也就不再需要关心怎么产生变化的细节. 那么基于同一个数据, 比如需要在通知栏里显示消息的数量, 那么显示消息数量的组件, 只需要绑定到消息的长度上, 它也会自动更新, 这样很效益就保证 UI 上的一致性了.

# 理解 React 的基本概念
- 理解三个概念: 组件, 状态 和 JSX.

* 使用组件的方式描述 UI
> 在 React 中, 所有的 UI 就是通过 组件 去描述和组织的,可以认为, React 中所有的元素都是组件, 具体而言分为两种:
1. 内置组件. 内置组件其实就是 `映射到HTML节点的组件`, 例如 div, input, table 等, 作为一种约定, 它们都是小写字母;
2. 自定义组件. 自定义组件其实就是 `自己创建的组件`, 使用时必须以大写字母开头, 例如: `TopicList`, `TopicDetail`;
> React 组件是以 `树状结构` 组织到一起的, 一个 React 的应用通常只有一个根组件.

* 使用 state 和 props 管理状态
- React 核心机制是能够在数据发生变化的时候自动重新渲染 UI, 那么就需要一个让我们保存状态的地方, 这个保存状态的机制就是 `state`. 而 `props` 就是类似于 Html 标记上属性的概念, 是为了在父子组件之间传递状态.
> 在函数组件中, 可以使用 useState 这样一个 Hook 来保存状态, 那么状态发生变化时, 也会让 UI 自动发生变化. 
```
import React from "react";
export default function Counter () {
    const [count, setCount] = React.useState(0);
    return (
        <div>
          <button onClick={ ()=> setCount(count + 1)}>{count}</button>
        </div>
    )
}
```  
> 以上, 通过 useState 定义这样一个状态, 让这个状态来保持计数器的数值, 那么在值发生变化时, 组件就会自动重新刷新. 

- 使用 state 来维护组件的状态, 接下来要关心的就是组件之间的交互, 这是 props 提供的作用.
> 无论是 div, span 这样的内置组件, 还是自定义组件, 都可以在使用时把接收属性作为参数. 而当这个参数发生变化时, 组件也就会自动重新渲染;
```
import React from "react";

function CountLabel({count}) {
    // 子组件用于显示颜色
    const color = count > 10? "red": "blue";
    return <span style={{color}}>{count}</span>;
}

export default function Counter() {
    // 定义了 count 这个 state 
    const [ count, setCount ] = React.useState(0);

    return (
        <div>
          <button onClick={()=> setCount(count + 1)}>
             <CountLabel count={count} />
          </button>
        </div>
    );
}
```  

* JSX语法本质  
- 可以认为是一个 `语法糖`;
```
React.createElement(
    "div",
    null,
    React.createElement(
        "button",
        { onClick: function onClick(){
            return setCount(count + 1);
        }},
        React.createElement(CountLabel, { count: count})
    )
);
```  
> `React.createElement` 这样一个 API, 它的作用就是创建一个组件的实例, 此外, 这个 API 会接收一组参数:
>> 第一个参数表示组建的类型;
>> 第二个参数是传给组件的属性,也就是 props;
>> 第三个以及后后续所有的参数则是子组件;  
> 通过 createElement 这个 API, 我们可以构建需要的组件树, 而 JSX 只是让这样描述变得更加直观和高效. 所以说 JSX 其实是一种语法糖. "模板语言";

# 脚手架工具创建 React 应用
* [codesandbox.io](https://codesandbox.io), 主要用于学习 React, 快速实验一些 React 的特性;
* create-react-app 命令行工具, 用来创建一个基础的 React 项目;


# 实战: 在组件中发送请求并显示数据  
- 页面上有一个按钮, 点击后, 可以发起一个请求获取一个用户列表, 并要求显示在页面上. 在这个过程中, 我们需要考虑数据状态, Loading 的状态, 以及请求出错的处理.
```

import React from "react";

export default function UserList() {
  // 使用三个 state 分别保存用户列表，loading 状态和错误状态
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // 定义获取用户的回调函数
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://reqres.in/api/users/");
      const json = await res.json();
      // 请求成功后将用户数据放入 state
      setUsers(json.data);
    } catch (err) {
      // 请求失败将错误状态放入 state
      setError(err);
    }
    setLoading(false);
  };

  return (
    <div className="user-list">
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? "Loading..." : "Show Users"}
      </button>
      {error && 
        <div style={{ color: "red" }}>Failed: {String(error)}</div>
      }
      <br />
      <ul>
        {users.length > 0 &&
          users.map((user) => {
            return <li key={user.id}>{user.first_name}</li>;
          })}
      </ul>
    </div>
  );
}

```  
> 在 React 组件中, 任何一个 state 发生变化时, 整个函数组件其实是被完全执行一遍的, 而且除了 state, 多次的执行之间没有任何关系. 所以在考虑这样一个场景的实现时, 我们的思考方式就是: 要首先考虑这个组件有哪些状态(state), 这些状态的变化是由什么触发的, 从而将整个功能串联起来. 
> 以上, 例子只是一个最简单的实现, 但如果细究下, 应该还会提出下面的问题:
1. 函数中定义了回调函数 fetchUsers, 但函数每次都是全部重新执行, 那会不会重复定义很多次呢?  
2. 如果另外一个组件可能也需要使用到 Users 这个数据, 比如一个下拉框, 那么是不是每次都要重复这个发起请求的逻辑呢?  
> 答: 
1. 是的, 这种写法会重复定义很多函数, 不过为了避免这样的问题, React 提供了 `useCallbaack` 这样一个 Hook 来缓存回调函数.
2. 对于异步请求逻辑的重用, 这其实也意味着跨组件状态的重用, `Redux` 这样一个全局状态管理框架来实现异步逻辑的复用.