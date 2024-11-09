/**
 * Message 组件接受一个 promise 作为参数, 然后在子组件内部, 我们可以使用 use 读取该 promise 中的值. 
 * 有了这个子组件后, 我们使用 Suspense 包裹捕获该组件的错误, 防止错误溢出到更高层级的组件. 
 * 
 * 1. 当 Message 组件首次渲染时, 由于直接读取 promise 导致报错, Suspense 捕获到该异常, 会渲染 fallback 中设置的组件. 
 * 2. 然后异步接口请求成功后, use渲染 Message 组件 
 */

import { use } from 'react'
export default function Message(props) {
    const { promise, message } = props
    let result = {}
    if(promise) {
      result = use(promise)
    }
    
    return (
      <div className='flex border shadow'>
        <div>Heads Up!</div>
        <div>{result.value || message }</div>
      </div>
    )
  }