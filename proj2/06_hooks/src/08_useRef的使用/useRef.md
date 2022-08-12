# useRef 返回一个ref对象, 返回的 ref对象在组件的整个生命周期保持不变.  
# 最常用的 ref 是两种用法:  
- 用法一: 引入DOM( 或者组件, 但是需要是class组件) 元素;  
- 用法二: 保存一个数据, 这个对象在整个生命周期中可以保持不变;  

# useRef: 在多次渲染之间共享数据  `多次渲染之间，共享数据，意思是组件的整个生命周期。`
- 函数组件虽然非常直观, 简化了思考 UI 实现的逻辑, 但是比起 Class 组件, 还缺少了一个很重要的能力: `在多次渲染之间共享数据`.  
- 在类组件中, 我们可以定义类的成员变量, 以便能在对象上通过成员属性去保存一些数据. 但是在函数组件中, 是没有这样一个空间去保存数据的. 因此, React 让 useRef 这样一个 Hook 来提供这样的功能. 

# useRef API: `const myRefContainer = useRef(initialValue);`  
- 我们可以把 useRef 看作是在函数组件之外创建的一个`容器空间`. 在这个容器上, 我们可以通过唯一的 current 属性设置一个值, 从而在函数组件的多次渲染之间共享这个值.  

# useRef 的这个功能具体有什么作用? 
- 假设你要去做一个计时器组件, 这个组件有开始和暂停两个功能. 很显然, 你需要用 `window.setInterval` 来提供计时功能; 而为了能够暂停, 你就需要在某个地方保存这个 `window.setInterval` 返回的计数器的引用. 那么, 这个保存计数器引用的最合适的地方, 就是 useRef, 因为它可以存储跨渲染的数据. 如下: 
```
import React, { useState, useCallback, useRef } from 'react';

export default function Timer() {
    const [time, setTime] = useState(0);
    const timer = useRef(null);
    const handleStart = useCallback(() => {
        // 使用 current 属性设置 ref 的值
        timer.current = window.setInterval(()=>{
            setTime((time)=> time + 1);
        },100);
    }, []);
    const handlePause = useCallback(()=> {
        window.clearInterval(timer.current);
        timer.current = null;
    }, []);

    return (
        <div>
          {time / 10} seconds.
          <br />
          <button onClick={handleStart}>Start</button>
          <button onClick={handlePause}>Pause</button>
        </div>
    );
}
```  
- 这里可以看到, 我们使用了 useRef 来创建了一个保存 window.setInterval 返回句柄的空间, 从而能够在用户点击暂停按钮时清除定时器, 达到暂停计时的目的.  
- 同时你也可以看到, 使用 useRef 保存的数据一般是和 UI 的渲染无关的, 因此当 ref 的值发生变化时, 是不会触发组件的重新渲染的, 这也是 useRef 区别与 useState 的地方.  `useRef doesn't trigger re-rendering`
- 问题: 是任何场景 函数都用useCallback 包裹吗？那种轻量的函数是不是不需要？
> 确实不是，`useCallback 可以减少不必要的渲染，主要体现在将回调函数作为属性传给某个组件`。如果每次都不一样就会造成组件的重新渲染。但是如果你确定子组件多次渲染也没有太大问题，特别是原生的组件，比如 button，那么不用 useCallback 也问题不大。所以这和子组件的实现相关，和函数是否轻量无关。但是比较好的实践是都 useCallback。  
- 问题: useCallBack依赖是空数组表示什么？
> 没有意义，相当于每次都创建一个新的函数  
- 问题: 关于子组件props 不变，可以减少不必要的渲染问题，不是特别理解。似乎只要父组件重新渲染子组件必然重新渲染，是内部有什么别的地方优化么？
> 好问题，之前在 Class 组件中可以把组件继承自 React.PureComponent，从而 props 没变就不重新 render。现在函数组件没有 PureComponent的概念，但是提供了 [React.memo](https://reactjs.org/docs/react-api.html#reactmemo) 这样一个高阶组件，可以让任何 React 组件都能在 props 不变时就不重新渲染。所以，在开发过程中，即使现在没有使用 React.memo，但是使用 useCallback 或者 useMemo 至少可以为性能优化提供一个基础。  
- 问题: useRef 如果只是用来 在多次渲染之间共享数据，是不是直接可以把变量定义到组件外面，这样也可以达到目的，感觉还更方便一点呢? 
>  useRef 可以保证这个变量只在当前组件的实例中使用。也就是说，如果一个组件页面上有多个实例，比如：`<div><Timer /><Timer /></div>`. 那么组件外的普通变量是被 Timer 共享的，就会产生问题。  

# 除了存储渲染的数据之外, useRef 还有一个重要的功能, 就是`保存某个DOM节点的引用.` 我们知道, 在React中,  几乎不需要关心真实的 DOM 节点是如何渲染和修改的. 但是在某些场景中, 我们必须要获得真实 DOM 节点的引用, 所以结合 React 的 ref 属性和 useRef 这个 Hook, 我们就可以获得真实的 DOM 节点, 并对这个节点进行操作.  

- 比如说, 你需要在点击某个按钮时让某个输入框获得焦点, 可以通过下面的代码来实现: 
```
function TextInputWithFocusButton() {
    // 这句话，没有动态设置useRef的current，因为ref自动绑定到了dom节点，相当于是一种隐式设置。注意和上面例子的区别。
    const inputEl = useRef(null);
    const onButtonClick = ()=> {
        // current 属性指向了真实的 input 这个 DOM 节点, 从而可以调用 focus 方法
        inputEl.current.focus();
    };
    return (
        <>
          <input ref={inputEl} type="text" />
          <button onClick={onButtonClick}>Focus the input</button>
        </>
    );
}
```  
- 这段代码是 React 官方文档提供的一个例子, 可以看到 ref 这个属性提供了获得 DOM 节点的能力, 并利用 useRef 保存了这个节点的应用. 这样的话, 一旦 input 节点被渲染到界面上, 那我们通过 inputEl.current 就能访问到真实的 DOM 节点的实例了.   