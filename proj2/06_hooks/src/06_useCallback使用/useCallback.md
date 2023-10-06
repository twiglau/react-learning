# useCallback

- useCallback 实际的目的是为了进行性能的优化；
- 如何进行性能优化呢？

1. useCallback 会返回一个函数的 memoized(记忆的)值；
2. 在依赖不变的情况下， 多次定义的时候，返回的值是相同的；

```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```
