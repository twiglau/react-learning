/**
 * 大多数情况都是这种并没有直接得到 Promise resolve 的结果状态,
 * 那么应该怎么办? 这个时候可以利用 Suspense 来解决这个问题
 * 
 * - Suspense 可以捕获这种异常. 
 * > 在这段代码中
 * 为了让Suspense捕获更小范围的组件, 我们单独定义了一个子组件 Content 来使用 use 获取
 * promise 中的数据. 
 * 
 * - Suspense 能够捕获到 子组件首次渲染的 异常. 因此我们常常将 suspense 当成一种组件错误边界来处理.
 * - 但是需要注意的是, 传递给 Suspense 的异步组件必须在报错时, 返回一个 Promise 对象, 它才能正常工作. 
 * 
 * - 在React19中, use(promise) 被设计成完全符合 Suspense 规范的 Hook
 * - 因此我们可以轻松的结合他们两者完成页面开发. 
 */

import { use, Suspense } from 'react'
import Message from './Message'

const _api3 = () => {
    return new Promise(resolve => {
        resolve({
            value: `
               React does not preserve any state for renders that got suspended 
               before they were able to mount for the first time.
               When the component has loaded, React will retry rendering the suspended
               tree from scratch.
            `
        })
    })
}


export default function Demo01() {
    const promise = _api3()
    return (
        <Suspense fallback=''>
            <Content promise={promise} />
        </Suspense>
    )
}

function Content(props) {
    const { value } = use(props.promise)
    return (
        <Message message={value} />
    )
}


/**
 * Suspense 工作原理
 * 
 * Suspense 提供了一个加载数据的标准. 在源码中, Suspense 的子组件被称为 primary.
 * 
 * 当react 在 beginWork 的过程中(diff 过程), 遇到 Suspense 时, 首先会尝试加载 primary 组件. 
 * 如果 primary 组件只是一个普通组件, 那么就顺利渲染完成. 
 * 
 * 如果 primary 组件是一个包含了 use 读取异步 promise 的组件, 它会在首次渲染时, 抛出一个异常. 
 * react 捕获到该异常之后, 发现是一个我们在语法中约定好的 promise, 那么就会将其 then 的回调函数保存下来, 
 * 并将一个 next beginWork (fallback) 的组件重新制定为 Suspense. 
 * 
 * 此时 promise 在请求阶段, 因此再次 beginWork Suspense 组件时, 会跳过 primary 的执行而直接渲染 fallback 
 * 
 * 当 primary 中的promise执行完成时 [resolve], 会执行刚才保存的 then 方法, 此时会触发 Suspense 再次执行 [调度一个更新执行].
 * 由于此时 primary 中的 promise 已经 resolve, 因此此时就可以拿到数据直接渲染 primary 组件. 
 * 
 * Suspense ->
 * primary ->
 * Suspense ->
 * fallback ->
 * waiting -> resolve() ->
 * Suspense ->
 * primary ->
 */