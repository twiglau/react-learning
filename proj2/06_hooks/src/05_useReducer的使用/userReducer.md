# useReducer

- 很多人看到 useReducer 的第一反应应该是 redux 的某个替代品， 其实并不是；

## useReducer 仅仅是 useState 的一种替代方案:

- 在某些场景下, 如果 state 的处理逻辑比较复杂, 我们可以通过 useReducer 来对其进行拆分;
- 或者这次修改的 state 需要依赖之前的 state 时, 也可以使用;

```js
export function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, counter: state.counter + 1 };
    case "decrement":
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
}
```

```js
import { counterReducer } from "../reducer/counter";

export default function Home() {
  const [state, dispatch] = useReducer(counterReducer, { counter: 100 });

  return (
    <div>
      <h2>当前计数： {state.counter}</h2>
      <button onClick={(e) => dispatch({ type: "increment" })}>+1</button>
      <button onClick={(e) => dispatch({ type: "decrement" })}>-1</button>
    </div>
  );
}
```

- 数据是不会共享的， 它们只是使用了相同的 counterReducer 的函数而已
- 所以， useReducer 只是 useState 的一种替代品，并不能拿替代 Redux.
