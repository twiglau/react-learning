# 声明时 effects  
* 在redux-sage的世界里, Sagas 都用 Generator 函数实现. 我们从 Generator 里 yield 纯 JavaScript 对象以表达 Saga 逻辑  
* 我们称呼那些对象为 Effect. Effect 是一个简单的对象, 这个对象包含了一些给 middleware 解释执行的信息  
* 你可以把 Effect 看作是发送给 middleware 的指令以执行某些操作 (调动某些异步函数,发起一个 action 到 store,等等)  
> `cps(fn, ...args)` 创建一个 Effect 描述信心, 用来命令 middleware 以 Node 风格的函数 (Node style function) 的方式调用 fn  
> `call(fn, ...args)` 创建一个 Effect 描述信息, 用来命令 middleware 以参数 args 调用函数 fn  
> `call([context, fn], ...args)`  类似 call(fn, ...args) , 但支持传递 this 上下文给fn, 在调用对象方法时很有用  
> `apply(context, fn, [...args]` call([context, fn] ...args) 的另一种写法  