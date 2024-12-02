# useTransition

- useTransition 与 useDeferredValue 有几乎一致的作用. 他们都可以降低 UI 任务更新的优先级.
  只是在语法上有一些不太一样.

```jsx
const [isPending, startTransition] = useTransition();
```

1. startTransition 可以标记一个或者多个状态的 set 方法, 将他们标记为 transition, 也就是
   调低他们更新的优先级
   > 但是这里需要注意的是, 被调低的不是 set 方法本身的执行, 而是其对应的 UI 更新.
2. isPending 表示是否还有为完成的 UI 更新任务. 我们可以利用这个状态来判断请求是否正在发生.
