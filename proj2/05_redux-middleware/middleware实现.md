# middleware

## 打印日志需求

- 前面已经提过，中间件的目的是在 redux 中插入一些自己的操作：

  > 比如我们现在有一个需求，在 dispatch 之前，打印一下本次的 action 对象， dispatch 完成之后可以打印下最新的 store state;
  > 也就是我们需要将对应的代码插入到 redux 的某部分， 让之后所有的 dispatch 都可以包含这样的操作；

- 如果没有中间件，是否可以实现类似的代码？ 可以在派发的前后进行相关的打印；

- 方式一：直接在实现地方进行打印。
- 但是这种方式缺陷非常明显：
  > 首先， 每一次的 dispatch 操作， 都需要在前面加上这样的逻辑代码；
  > 其次， 存在大量重复的代码，会非常麻烦和臃肿；
- 是否有一种更优雅的方式来处理这样的相同逻辑呢？

  > 可以将代码封装到一个独立的函数中

- 但是这样代码也有缺陷：
  > 调用者（使用者）在使用我的 dispatch 时， 必须使用我另外封装的一个函数 dispatchAndLog;
  > 显然，对于调用者来说，很难记住这样的 API, 更加习惯的方式时直接调用 dispatch;

## 修改 dispatch

- 事实上， 我们可以利用一个 hack 一点的技术： Monkey Patching, 利用它可以修改原有的程序逻辑；
- 我们对代码进行如下的修改：

  > 这样就意味者我们已经直接修改了 dispatch 的调用过程；
  > 在调用 dispatch 的过程中，真正调用的函数其实是 dispatchAndLog;

- 当然，我们可以将它封装到一个模块中，只要调用这个模块中的函数，就可以对 store 进行这样的处理；

```js
function patchLoggering(store) {
  let next = store.dispatch;
  function dispatchAndLog(action) {
    console.log("dispatching: ", action);
    next(action);
    console.log("新的store: ", store.getState());
  }

  store.dispatch = dispatchAndLog;
}
```

## thunk 需求

- redux-thunk 的作用：

  > 我们知道 redux 中利用一个中间件 redux-thunk 可以让我们的 dispatch 不再只是处理对象，并且可以处理函数；
  > 那么 redux-thunk 中的基本实现过程是怎样呢？

- 查看下面的代码
- 对 dispatch 进行转换，这个 dispatch 会判断传入的类型

```js
function patchThunk(store) {
  let next = store.dispatch;

  function dispatchAndThunk(action) {
    if (typeof action === "function") {
      action(store.dispatch, store.getState);
    } else {
      next(action);
    }
  }

  store.dispatch = dispatchAndThunk;
}
```

## 合并中间件

- 单个调用某个函数来合并中间件并不是特别的方便， 我们可以封装一个函数来实现所有的中间件合并：

```js
function applyMiddleware(store, middleware) {
  middlewares = middlewares.slice();

  middlewares.forEach((middleware) => {
    store.dispatch = middleware(store);
  });
}

applyMiddleware(store, [patchLogging, patchThunk]);
```

- 我们来理解下上面操作之后，代码的流程：

```js
dispatch(action) -> patchDelay函数 -> let next=store.dispatch -> patchThunk函数 -> 真正dispatch
```
