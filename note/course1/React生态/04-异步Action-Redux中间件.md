# Redux 异步请求  

* Middlewares 中间件 [Dispatcher中]
> 作用: 截获某种特殊类型的 action  ,进行预处理后,才会把 成功,或失败action 发给 Reducer 
> 1. 截获 action 
> 2. 发出 action  
* Actions 发出去后, 回到 Dispatcher 这一层  

# 小结
1. 异步 action 不是特殊 action, 而是多个同步 action 的组合使用  
2. 中间件在 dispatcher 中截获 action 做特殊处理  