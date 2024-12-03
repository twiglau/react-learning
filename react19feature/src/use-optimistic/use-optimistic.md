# useOptimistic

## 乐观更新

- 通常指在提交数据时, 乐观估计请求结果,不等待真实的请求结果, 而直接基于乐观结果
  修改页面状态的交互方式.
- 例如,在聊天软件中, 发送一条消息时, 当我们点击发送之后, 消息就会立即出现在聊天界面,
  而不会等待发送成功之后再更新新页面 UI .
- 普通逻辑

```js
// 1. 时间触发
// 2. 发送请求, 等待请求成功 Loading
// 3. 请求成功
// 4. 更新 UI 为正确结果
```

- 乐观更新执行过程

```js
1. 事件触发 -> 直接更新 UI
2. 更新 UI 的同时 发起请求 Loading
3. 请求成功 -> 保持 UI 不变
4. 若请求失败 -> 则回退 UI
```

- 适用场景: 如,在聊天软件中, 发送一条消息, 在阅读文章时, 点赞收藏按钮的交互,给文章发送一条
  评论,删除一条评论等都非常适合乐观更新.

1. 请求成功概率非常大, 几乎不会失败
2. 不涉及到频繁的, 密集的 UI 变化
3. 可撤回的 UI 变化
4. 与服务端的反馈时间短, 不是一个长期的持续的响应过程

## 实现乐观更新需要具备的技术条件

- 由于乐观更新是一种在 低概率 的情况下, 需要撤回更新状态的交互机制. 因此, 我们在第一时间更新到最新状态时, 需要保留
  上一次的更新状态以便撤回

- 这样场景 与 redux/useReducer 需要的技术架构非常类似. 因此, 每一次的更新我们都可以将其设计为一次 action, 通过
  reducer 的方式 将其合并到完整数据中去

```js
interface Action {
  // 操作方式
  type: string;
  state: {
    id: "xxx",
    text: "xxx",
  };
}

// 假设 state 是一个列表
reducer(state, action) {
  return [...state, action.state]
}
```

- 如果保留了上一次的更新状态, 我们也可以非常方便的还原数据

1. 除此之外, 乐观更新的数据结构是我们在客户端根据预估情况生成的, 因此不能直接存储在服务端,
   有的数据需要按照服务端的逻辑来创建, 例如 一条数据包含了 id, 那么我们就不能按照客户端的逻辑来
   创建 id, 这个时候, 需要我们 在接口请求成功之后, 完整的完成一次数据的替换.
2. 最后的问题,那就是更新快速重复的发生时, 如何处理. 这是乐观更新最考验开发者的地方.
   当第一次请求还没结束时, 但是此时乐观更新重复发生, 就会一起一系列不合理的问题. 因此, 什么时候将 action 合并
   到真实数据中去,需要反复斟酌
3. 这里不仅要考虑更新失败时,如何处理,更需要考虑竞态的顺序问题,必须以 action 创建顺序将 action 合并到数据中.
4. 在保证顺序基础上, 还需要考虑前面如果某个 action 迟迟不响应, 会阻塞后面 action 合并. 因此,我们需要设计一个
   合理的超时机制

## React19 实现乐观更新

- useOptimistic

```jsx
const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);
```

1. useOptimistic 接收两个参数, 其实这两个参数与 reducer 的参数非常相似.
   > state 表示当前状态, updateFn 表示我们如何将新的 action 合并到 state 中.
   ```jsx
   updateFn = (currentState, value) => {
     //根据上一次状态与新的sate合并
     //merge and reture new state
   };
   ```
2. optimisticState 表示合并之后的新状态, 但是需要注意: 它是一个临时状态,并非最终状态.
   通常情况下, 我们会使用该临时状态渲染 UI, 以便 UI 能够得到最快速的响应.
3. addOptimistic 是一次操作行为, 类似于 dispatch, 它会将参数传递给 updateFn

```jsx
addOptimistic({a: 1})

->

// 此时 value = {a: 1}
updateFn = (currentState, value) => {
  return [...currentState, value]
}
```

4. 在使用 useOptimistic 之前, 还需要借助 useState 创造一个状态, 该状态为更新的真实状态.
   我们通过 useOptimistic 得到的状态是一个副本, 它通过 useState 的状态来初始化, 在接口请求成功之后,
   真实状态才会得到更新
