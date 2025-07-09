# useTransition

## useTransition 与 useDeferredValue 有几乎一致的作用。 都可以降低 UI 任务更新的优先级。

```js
const [isPending, startTransition] = useTransition();
```

- startTransition 可以标记一个或者多个状态的 set 方法， 将他们标记为 transition -- 调低他们更新的优先级。
- isPending 表示是否还有未完成的 UI 更新任务。我么可以利用这个状态来判断请求是否正在发生。

## 区别

1. 优先级被调低的不是 set 方法本身的执行，而是其对应的 UI 更新。
2. 除了这个区别之外， useTransition 可以在组件顶层同时将多个 state 的 set 方法设置为 低优先级。
3. useDeferredValue 可以在子组件中， 设置来自 props 的装填延迟。 这个也是 useTransition 不方便做到的。
