# 声明时 effects  
* 在redux-sage的世界里, Sagas 都用 Generator 函数实现. 我们从 Generator 里 yield 纯 JavaScript 对象以表达 Saga 逻辑  
* 我们称呼那些对象为 Effect. Effect 是一个简单的对象, 这个对象包含了一些给 middleware 解释执行的信息  
* 你可以把 Effect 看作是发送给 middleware 的指令以执行某些操作 (调动某些异步函数,发起一个 action 到 store,等等)  
> `cps(fn, ...args)` 创建一个 Effect 描述信心, 用来命令 middleware 以 Node 风格的函数 (Node style function) 的方式调用 fn  
> `call(fn, ...args)` 创建一个 Effect 描述信息, 用来命令 middleware 以参数 args 调用函数 fn  
> `call([context, fn], ...args)`  类似 call(fn, ...args) , 但支持传递 this 上下文给fn, 在调用对象方法时很有用  
> `apply(context, fn, [...args]` call([context, fn] ...args) 的另一种写法  

# fork  
* 当 loginFlow 在 login 中被阻塞了, 最终发生在开始调用和收到响应之间的 LOGOUT 将会被错过;  
* 我们需要的是一些非阻塞调用 login;  
* 为了表示无阻塞调用, redux-saga 提供了另一个 Effect: fork, 当我们 fork 一个任务, 任务会在后台启动, 调用者也可以继续它自己的流程, 而不同等待被 fork 的任务结束  

# race  
* 有时候我们同时启动多个任务, 但又不想等待所有任务完成, 我们只希望按到胜利者: 即第一个被 resolve (或 reject) 的任务  
* race 的另一个有用的功能是, 它会自动取消那些失败的 Effects  