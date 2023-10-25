# 使用 TODO 查看所有注释

# redux-thunk 使用

1. 组件中某段代码 发送网络请求

```js
userEffect;
```

2. store dispatch 某个 action, action 拆分：

1) thunk 后，
2) 发送某个 对应 dispatch

# redux hook 的使用

- 组件和 redux 关联： 获取数据和进行操作

1. 操作： 直接在组件中获取 dispatch

```js
const dispatch = useDispatch();
// 发送网络请求
useEffect(() => {
  dispatch(某个action);
}, [dispatch]);
```

2. 获取： useSelector

```js
const { topBanners } = useSelector((state) => ({
  topBanners: state.recommend.topBanners,
}));
```

3. 操作规范： https://blog.cjw.design/blog/frontend/react-redux

- useSelector()
  功能 :
  允许传入一个选择器函数从 redux state 中取需要的状态数据并返回。示例：

  ```js
  const data: any = useSelector(selector: Selector, eqaulityFn?: Function)
  ```

  该 api 功能类似传统 `connect api` 传入的 `mapStateToProps`， 但是表现形式还是有些许差别
  i. 选择器 `Selector` 函数可以返回任意类型的数据，而不仅限于 对象
  ii. 当 dispatch 一个 action 的时候，useSelector() 函数将对 Selector 选择器函数的返回值和上一个状态的返回值进行比较，如果 不同就会强制渲染组件，相同则不会
  iii. Selector 选择器 没有 接收 ownProps 属性
  VI. useSelector 默认比较更新 方式 为 ===, 如果需要浅层比较可以传入 第二个参数 equalityFn

  Tips: 不要在 Selector 选择器函数中 使用 props 属性, 否则可能会导致错误， 原因如下

  选择器函数依赖 props 的 某个数据
  dispatch action 会导致父组件重新渲染，并传递新的 props
  子组件渲染时，选择器函数的执行时机会在 新 props 传入之前先执行，此时就会可能导致选择器函数返回错误数据，甚至报错 Zombile Child 是另一种 旧 props 导致异常的情况, 具体可以查看 常用警告

  V. 选择器相等比较与更新
  当函数组件呈现时，将调用提供的选择器函数，其结果将从 useSelector（）钩子返回。（如果缓存的结果与组件的上一次呈现中的函数引用相同，此时相当于检测到 返回的是同一个对象，则钩子可以不重新运行选择器而返回该结果。）

  useSelector()仅当选择器结果与上一个结果不同时才强制重新渲染。默认比较方式是 ===, connect 则是浅层比较，如果 useSelector() 返回一个新的对象 将导致每次都会重新渲染。

  因此当你希望从 redux store 中取多个数据时，和以前不同，需要额外的一些操作方法

  可以执行多次 useSelector()
  使用类似` Reselect` 的库 创建一个 记忆选择器 `Memoized Selector`, 该选择器可以在一个对象中 返回多个值，但是只当某个值发生变化时才会返回新对象
  使用 react-redux 的`shallowEqual` 作为 useSelector 的 `eaqulityFn` 参数，例如

  ```js
  import { shallowEqual, useSelector } from "react-redux";
  const selectedData = useSelector(selectorReturningObject, shallowEqual);
  ```

  当然也可以自定义 equalityFn，类似 Lodash `_.isEqual()`

  VI. 使用 Memoized Selector 记忆选择器 示例：

  ```js
  import React from "react";
  import { useSelector } from "react-redux";
  import { createSelector } from "reselect";
  const selectNumOfDoneTodos = createSelector(
    (state) => state.todos,
    (todos) => todos.filter((todo) => todo.isDone).length
  );
  export const DoneTodosCounter = () => {
    const NumOfDoneTodos = useSelector(selectNumOfDoneTodos);
    return <div>{NumOfDoneTodos}</div>;
  };
  export const App = () => {
    return (
      <>
        <span>Number of done todos:</span>
        <DoneTodosCounter />
      </>
    );
  };
  ```
