# 类似于生命周期这些?  
- Effect Hook 可以让你来完成一些类似于 class 中生命周期的功能;  
- 事实上, 类似于网络请求, 手动更新 DOM, 一些事件的监听, 都是React更新DOM的一些副作用(Side Effects);  
- 所以对于完成这些功能的Hook被称之为 Effect Hook;  
- useEffect让我们能够在下面四种实际执行一个回调函数产生副作用:
1. 每次render后执行: 不提供第二个依赖项参数. 比如 `useEffect(()=>{})`;
2. 仅第一次render后执行: 提供一个空数组作为依赖项. 比如 `useEffect(()=>{}, [])`;
3. 第一次以及依赖项发生变化后执行: 提供依赖项数组. 比如 `useEffect(()=>{}, [deps])`;
4. 组件 unmount 后执行: 返回一个回调函数, 比如 `useEffect(()=>{ return ()=>{}}, [])`;

# useEffect: 执行副作用;
* 副作用? 指`一段和当前执行结果无关的代码`. 
> 比如说要修改函数外部的某个变量, 要发起一个请求, 等等. 
> 也就是说, **在函数组件的当次执行过程中, useEffect中代码的执行是不影响渲染出来的 UI 的**.
> 用来模拟声明周期函数 -> 在完整页面出现之前, 做一些小处理,比如加载之前读取的内容. 

* 定义: `useEffect(callback, dependencies)` 
> 第一个为要执行的函数 callback.
> 第二个是可选的依赖项数组 dependencies.
> 其中依赖项时可选的, 如果不指定, 那么 callback 就会在每次函数执行完后都执行; 如果指定, 那么只有依赖项中的值发生变化的时候, 它才会执行.
> 对应到 Class 组件, 那么 useEffect 就涵盖了 ComponentDidMount, componentDidUpdate 和 componentWillUnmount 三个声明周期方法. 不过千万不要按照把 useEffect 对应到某个 或者 几个声明周期的方法. 只要记住: **useEffect是每次组件 render 完后判断依赖并执行** 就可以了
> useEffect 的 callback 要避免直接的 async 函数, 需要封装一下, **useEffect 的回调参数返回的是一个清除副作用的clean-up函数,因此无法返回Promise,更无法使用async/await.**, 如果让 useEffect 支持 async/await, 如下例子

* 例子: 某个组件用于显示一篇 Blog 文章, 那么这个组件会接收一个参数来表示 Blog 的ID. 而当 ID 发生变化时, 组件需要发起请求来获取文章内容并展示: 
```
import React, { useState, useEffect } from 'react';

function BlogView({ id }) {
    // 设置一个本地 state 用于保存 blog 内容
    const [ blogContent, setBlogContent ] = useState(null);

    useEffect(() => {
        // useEffect 的 callback 要避免直接的 async 函数, 需要封装一下
        const doAsync = async () => {
            // 当 id 发生变化时, 将当前内容清除以保持一致性
            setBlogContent(null);
            // 发起请求数据
            const res = await fetch('/blog-content/${id}');
            // 将获取的数据放入 state 
            setBlogContent(await res.text());
        };
        doAsync();
    }, [id]); // 使用 id 作为依赖项, 变化时则执行副作用
}
```  
> 这样, 我们就利用 useEffect 完成了一个简单的数据请求的需求. 在这段代码中, 我们把 ID 作为依赖项参数, 这样就很自然地在ID发生变化时, 利用useEffect执行副作用去后去数据. 如果在之前的类组件中要完成类似的需求, 我们就需要在 componentDidUpdate 这个方法里, 自己去判断两次ID是否发生了变化. 如果变了, 才去请求. 这样的话, 逻辑上就不如 useEffect 来的直观.

* useEffect 还有两个特殊的用法: **没有依赖项, 以及依赖项作为空数组**
1. 没有依赖项, 则每次 render 后都会重新执行
```
useEffect(()=>{
    // 每次 render 完, 一定执行
    console.log('re-rendered');
})
```  
2. 空数组作为依赖项, 则只有首次执行时触发, 对应到 Class 组件就是 componentDidMount. 
```
useEffect(()=>{
    // 组件首次渲染时执行, 等价于 class 组件中的 componentDidMount
    console.log('did mount');
},[])
```  

* useEffect 还**允许你返回一个函数, 用于在组件销毁的时候做一些清理的操作.**
> 比如移除事件的监听. 这个机制就几乎等价于类组件中的 componentWillUnmount.
```
// 设置一个 size 的 state 用于保存当前窗口尺寸
const [size, setSize] = useState({});
useEffect(() => {
    // 窗口大小变化事件处理函数
    const handler = () => {
        setSize(getSize());
    };

    // 监听 resize 事件
    window.addEventListener('resize', handler);
    // 返回一个 callback 在组件销毁时调用
    return () => {
        // 移除 resize 事件
        window.removeEventListener('resize', handler);
    }
}, []);
```  
> 通过这样一个简单的机制, 我们能过更好管理副作用, 从而确保组件和副作用的一致性.

# 理解 Hooks 的依赖 `useEffect useCallback useMemo`
- Hooks 提供了让你监控某个数据变化的能力. 这个变化可能会触发组件的刷新, 也可能是去创建一个副作用, 又或者是刷新一个缓存. 那么定义要监听哪些数据变化的机制, 其实就是 指定Hooks的依赖项;
- 依赖项并不是内置Hooks的一个特殊机制,而可以认为一种设计模式. 有类似需求的Hooks都可以用这种模式去实现;
- 在定义依赖项时, 需要注意以下三点: 
1. 依赖项中定义的变量一定是会在回调函数中用到的, 否则声明依赖项时没有意义的;
2. 依赖项一般是一个常量数组,而不是一个变量. 因为一般在创建callback的时候, 你其实非常清除其中要用到那些依赖项了;
3. React 会使用`浅比较` 来对比依赖项是否发生了变化, 所以要特别注意数组或者对象类型. 如果你是每次创建一个新对象, 即使和之前的值是等价的, 也会被认为依赖项发生了变化. *这是一个刚开始使用Hooks时很容易导致Bug的地方* 如下:
```
function Sample() {
    // 这里在每次组件执行时候创建了一个新数组
    const todos = [{text: 'Learn Hooks.'}];
    useEffect(()=>{
        console.log('Todos changed.');
    }, [todos]);
}
```  
> 代码的原意可能是在 todos 变化的时候去产生一些副作用, 但是**这里的 todos 变量是在函数内创建的, 实际上每次都产生了一个新新数组**. 所以在作为依赖项的时候进行引用的比较, 实际上认为是发生了变化的.

# 掌握 Hooks 的使用规则  
- Hooks 本身作为纯粹的 JavaScript 函数, 不是通过某个特殊的 API 创建的, 而是直接定义一个函数. 它需要在降低学习和使用成本的同时, 还需要一定的规则才能正常工作.

* 规则1: 只能在函数组件的顶级作用域使用;
- 顶级作用域: 就是 Hooks **不能在循环, 条件判断 或者 嵌套函数内执行, 而必须是在顶层**.
- 同时, Hooks **在组件的多次渲染之间, 必须按顺序被执行**. 因为在 React 组件内部, 其实是维护了一个对应组件的固定 Hooks 执行列表的, 以便在多次渲染之间保持 Hooks 的状态, 并做对比.
- 规则总结为两点: 1. 所有Hook必须要被执行到. 2. 必须按顺序执行.
```
// 下面代码是可行的, 因为Hooks 一定会被执行到:
function MyComp() {
    const [ count, setCount ] = useState(0);
    // ...
    return <div>{count}</div>
}

// 而下面代码是错误的, 因为在某些条件下 Hooks 是不会被执行到的:
function MyComp() {
    const [count, setCount] = useState(0);
    if(count > 10){
        // 错误: 不能将 Hook 用在条件判断里
        useEffect(()=>{
            // ...
        }, [count])
    }
    // 这里可能提前返回组件渲染结果, 后面就不能再用 Hooks 了
    if(count === 0){
        return 'No Content';
    }
    // 错误: 不能将 Hook 放在可能的 return 之后
    const [ loading, setLoading ] = useState(false);

    // ...
    return <div>{count}</div>
}
```  

* 规则2: 只能在函数组件或者其他 Hooks 中使用;
- Hooks 作为专门为函数组件设计的机制, 使用的情况只有两种: 1. 在函数组件内, 2. 在自定义的 Hooks 里面;
- 这个规则在函数组件和类组件同时存在项目中, 可能会造成一定的困扰, 因为Hooks 简洁, 直观. 我们可能都倾向于用Hooks来实现逻辑的重用, 但是如果一定要在 Class 组件中使用, 那应该如何做? 
> 其实有一个通用的机制, 那就是**利用高阶组件的模式, 将Hooks封装成高阶组件, 从而让类组件使用.**