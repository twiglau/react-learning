import React, { useReducer, useState, useEffect } from 'react'

// 如果我们有两个互相依赖的状态，或者我们想基于一个 prop 来计算下一次的 state，setCount(c => c + 1)它并不能做到。
// 幸运的是， 有一个更强大的姐妹模式，它的名字叫 useReducer。
function Counter() {
    const [count, setCount] = useState(0);
    const [step, setStep] = useState(1);
   
    useEffect(() => {
      const id = setInterval(() => {
        setCount(c => c + step);
      }, 1000);
      return () => clearInterval(id);
    }, [step]);
   
    return (
      <>
        <h1>{count}</h1>
        <input value={step} onChange={e => setStep(Number(e.target.value))} />
      </>
    );
}
// 这个例子目前的行为是修改会重启定时器 - 因为它是依赖项之一。
// 在大多数场景下，这正是你所需要的。清除上一次的effect然后重新运行新的effect并没有任何错。
// 不过，假如我们不想在改变后重启定时器，我们该如何从effect中移除对的依赖呢？

// 当你想更新一个状态，
// 并且这个状态更新依赖于另一个状态的值时，你可能需要用useReducer去替换它们

// reducer 可以让你把组件内发生了什么(actions)和状态如何响应并更新分开表述。
// 我们用一个 dispatch 依赖去替换 effect 的依赖 step ：

//你可能会问：“这怎么就更好了？”答案是React会保证dispatch在组件的声明周期内保持不变。所以上面例子中不再需要重新订阅定时器 。

//相比于直接在 effect 里面读取状态，它 dispatch 了一个 action 来描述发生了什么。
//这使得我们的 effect 和状态解耦。我们的 effect 不再关心怎么更新状态，它只负责告诉我们发生了什么。更新的逻辑全都交由 reducer 去统一处理。

export default function Counter1() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { count, step } = state;
   
    useEffect(() => {
      const id = setInterval(() => {
        dispatch({ type: 'tick' });
      }, 1000);
      return () => clearInterval(id);
    }, [dispatch]);
   
    return (
      <>
        <h1>{count}</h1>
        <input value={step} onChange={e => {
          dispatch({
            type: 'step',
            step: Number(e.target.value)
          });
        }} />
      </>
    );
}
const initialState = {
    count: 0,
    step: 1,
};

function reducer(state, action) {
    const { count, step } = state;
    if (action.type === 'tick') {
        return { count: count + step, step };
    } else if (action.type === 'step') {
        return { count, step: action.step };
    } else {
        throw new Error();
    }
}