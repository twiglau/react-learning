import React, { useEffect, useState } from 'react'

function Counter() {
    const [count, setCount] = useState(0);
   
    useEffect(() => {
      // 0. effect 函数本身在每一次渲染中都不相同
      // 1. React 会记住你提供的 effect 函数，并且会在每次更改作用于DOM并让浏览器绘制屏幕后去调用它。
      // 2. 所以虽然我们说的是一个 effect（这里指更新document的title），但其实每次渲染都是一个不同的函数
      // 3. 并且每个 effect 函数看到的 props 和 state 都来自于它属于的那次特定渲染
      console.log('useEffect 调用~')
      document.title = `You clicked ${count} times`;
    });
   
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
}

function Counter1() {
    //effect 中用到的所有组件内的值都要包含在依赖中
    const [count, setCount] = useState(0);
   
    useEffect(() => {
      const id = setInterval(() => {
        setCount(count + 1);
      }, 1000);
      return () => clearInterval(id);
    }, [count]);
    //每次修改都会重新运行 effect
    //这能解决问题但是我们的定时器会在每一次改变后清除和重新设定。这肯定不是我们想要的结果。
    return <h1>{count}</h1>;
}
export default function Counter2() {
    //修改 effect 内部的代码以确保它包含的值只会在需要的时候发生变更
    //在这个场景中，我们其实并不需要在effect中使用 count。
    //当我们想要根据前一个状态更新状态的时候，我们可以使用的函数形式
    const [count, setCount] = useState(0);
   
    useEffect(() => {
      console.log('useEffect~')
      const id = setInterval(() => {
        setCount(c => c + 1);
      }, 1000);
      return () => clearInterval(id);
    }, []);
    // 我们需要告知React的仅仅是去递增状态
    // 不管它现在具体是什么值。注意我们做到了移除依赖，并且没有撒谎。我们的 effect 不再读取渲染中的 count值。
    return <h1>{count}</h1>;
}