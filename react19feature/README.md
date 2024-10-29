# 新特性

## use()

- 利用 use 读取 context 中资源,读取 Promise 中的值
- 这里的 Promise 是指的是一个已经创建好的 Promise 对象, 并且,在该 Promise 对象中已经有了确定的 resolve 的结果, use 读取的是 resolve 的值.
- unlike React Hooks, use can be called within loops and conditional statements like if. Like React Hooks, the function that calls use must be a Component or Hook
