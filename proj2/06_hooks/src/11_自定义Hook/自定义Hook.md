# 自定义Hook本质
- 只是一种函数代码逻辑的抽取, 严格意义上来说, 它本身并不算 React 的特性.

# 典型的四个使用场景:  
1. 抽取业务逻辑;
2. 封装通用逻辑;
3. 监听浏览器状态;
4. 拆分复杂组件;  

# 开篇  
* 用好Hooks, 很重要的一点, 就是要能够从 Hooks 的角度思考问题. 要做到这一点并不难, 就是在遇到一个功能开发的需求时, 首先问自己一个问题: `这个功能中的那些逻辑可以抽出来成为独立的 Hooks?`  
> 这么问的目的, 是为了让我们尽可能地把业务逻辑拆成独立的 Hooks, 这样有助于实现代码的模块化和解耦, 同时也方便后面的维护. Hooks 有两个非常核心的优点:  
1. 一是方便进行逻辑复用; 
2. 二是帮助关注分离;  

# 如何创建自定义 Hooks ?
* 自定义 Hooks 在形式上非常简单, 就是 `声明一个名字以 use 开头的函数`, 比如 useCounter. 这个函数在形式上和普通的 JavaScript 函数没有任何区别, 可以`传递任意参数`给这个 Hook, 也可以`返回任何值`.
* 但是要注意, Hooks 和普通函数在语义上是有区别的, 就在于 `函数中有没有用到其他 Hooks`.
> 什么意思? 就是说如果你创建了一个 useXXX 的函数, 但是内部并没有用任何其他 Hooks, 那么这个函数就不是一个 Hook, 而只是一个普通的函数. 但是如果用了其他 Hooks, 那么它就是一个 Hook.  
> 以下简单计数器的实现, 当时把业务逻辑都写在了函数组件内部,但其实是可以把业务逻辑提取出来成为一个 Hook. 如下:  
```
import { useState, useCallback } from 'react';

function useCounter() {
    // 定义 count 这个 state 用于保存当前数值
    const [ count, setCount ] = useState(0);
    // 实现加 1 的操作
    const increment = useCallback(() => setCount(count + 1), [count]);
    // 实现减 1 的操作
    const decrement = useCallback(() => setCount(count - 1), [count]);
    // 重置计数器
    const reset = useCallback(() => setCount(0), []);

    // 将业务逻辑的操作 export 出去供调用者使用
    return { count, increment, decrement, reset };
}

// 有了这个 Hook, 就可以在组件中使用它, 比如下面:
import React from 'react';

function Counter() {
    // 调用自定义 Hook 
    const { count, increment, decrement, reset } = useCounter();

    // 渲染 UI 
    return (
        <div>
          <button onClick={decrement}> - </button>
          <p>{count}</p>
          <button onClick={increment}> + </button>
          <button onClick={reset}> reset </button>
        </div>
    );
}
```  
> 以上代码中, 我们把原来在函数组件中实现的逻辑提取了出来, 成为一个单独的 Hook, `一个方面能让这个逻辑得到重用, 另外一方面也能让代码更加语义化, 并且易于理解和维护`.

* 自定义 Hooks 的两个特点: 
1. 名字一定是以 use 开头的函数, 这样 React 才能够知道这个函数是一个 Hook;
2. 函数内部一定调用了其他的 Hooks, 可以是内置的 Hooks, 也可以是其他自定义 Hooks. 这样才能够让组件刷新, 或者产生副作用.

那么,在日常开发的时候, 除了解耦业务相关的逻辑, 还有哪些场景需要去创建自定义 Hooks 呢? 下面介绍三个典型的业务场景.  

# 封装通用逻辑: useAsync  
* 在组件的开发过程中, 有一些常用的通用逻辑. 过去可能会因为逻辑重用比较繁琐, 而经常在每个组件中去自己实现, 造成维护的困难. 但现在有了 Hooks, 就可以将更多的通常逻辑通过 Hooks 的形式进行封装, 方便被不同的组件重用.
* 比如, 在日常 UI 的开发中, 有一个最常见的需求: `发起异步请求获取数据并显示在界面上`. 在这个过程中, 我们不仅要关心请求正确返回时, UI会如何展现数据; 还需要处理请求出错, 以及关注 Loading 状态在 UI 上如何显示.

1. 我们可以重新看下载第1讲中看到的异步请求的例子, 从 Server 端获取用户列表, 并显示在界面上:  
```
import React from 'react';

export default function UserList() {
    // 使用三个 state 分别保存用户列表, loading 状态和错误状态
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    // 定义获取用户的回调函数
    const fetchUsers = async () => {
        setLoading(true);
        try{
            const res = await fetch("https://reqres.in/api/users/");
            const json = await res.json();
            // 请求成功后将用户数据放入 state 
            setUsers(json.data);
        }catch(err){
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
          {
              error &&
              <div style={{color: "red"}}>Failed: {String(error)}</div>
          }
          <br />
          <ul>
             {
                 users && users.length > 0 &&
                 users.map(user => <li key={user.id}>{user.first_name}</li>)
             }
          </ul>
        </div>
    );
}
```   
* 在这里, 我们定义了 users, loading 和 error 三个状态. 如果我们在异步请求的不同阶段去设置不同的状态, 这样 UI 最终能够根据这些状态展现出来. 在每个需要异步请求的组件中, 其实都需要重复相同的逻辑. 
* 事实上, 在处理这类请求的时候, 模式都是类似的, 通常都会遵循下面步骤:  
