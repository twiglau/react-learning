# 运行原理

## useDeferredValue 会尝试将 UI 任务更新两次

1. 第一次, 会给子组件传递旧值. 此时 Expensive 接收到的 props 会与上一次完全相同.
   如果结合了 React.memo, 那么该组件就不会重新渲染.该组件可以重复使用之前的渲染结果.
   > Compiler 编译之后不需要 memo
2. 此时, 高优先级的任务渲染会发生, 渲染完成之后, 将会开始第二次渲染. 此时,将会传入刚才更新之后的新值.
   对于 Expensive 而言, props 发生了变化,整个组件会重新渲染.
3. 我们通常会将已经非常明确的耗时任务标记为 deferred,因此, 这些任务都被视为低优先级.当重要的高优先级更新已经完成,低
   优先级任务在第二次渲染时尝试更新...
4. 在它第二次更新过程中,如果又有新的高优先级任务进来,那么 React 就会中断并放弃第二次更新,去执行高优先级的任务
   > 注意:是中断,并放弃这次更新,所以表现出来的结果就是: 中间会漏掉许多任务的执行

## 这样运行机制非常重要

1. 那就是,如果你的电脑性能足够强悍,那么第二次更新可能会快速完成,高优先级的任务来不及中断,那么我们的页面响应就是非常理想的.
2. 但是如果我们的电脑性能比较差,第二次更新还没完成,新的高优先级任务又来了,那么就可以通过中断的方式,降级处理,
   保证重要 UI 的流畅,放弃低优先级任务
   > 在不同性能的设备上,有不同的反应,这个是跟防抖, 节流的最重要的区别.
