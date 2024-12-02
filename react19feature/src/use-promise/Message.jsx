/**
 * Message 组件接受一个 promise 作为参数, 然后在子组件内部, 我们可以使用 use 读取该 promise 中的值. 
 * 有了这个子组件后, 我们使用 Suspense 包裹捕获该组件的错误, 防止错误溢出到更高层级的组件. 
 * 
 * 1. 当 Message 组件首次渲染时, 由于直接读取 promise 导致报错, Suspense 捕获到该异常, 会渲染 fallback 中设置的组件. 
 * 2. 然后异步接口请求成功后, use渲染 Message 组件 
 */

import { use } from 'react'
export default function Message(props) {
    let { promise, message, title } = props
    let content = null
    if(message) {
      content = unescape(message.replace(/\\u/gi, '%u'))
    }
    if(promise) {
      let result = use(promise)
      content = result.value
    }

    title = unescape((title || '').replace(/\\u/gi, '%u'))

    const base = 'flex border border-blue-100 p-4 rounded-md shadow'

    if(!content) {
      return (
        <div className={`${base} justify-center items-center flex-col text-gray-500`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
          </svg>

          <div className='mt-2'>no data.</div>
        </div>
      )
    }

    
    return (
      <div className={base}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
        </svg>
        <div className='flex-l ml-3'>
          <div>{title || 'Heads Up!'}</div>
          <div className='text-sm mt-l text-gray-600'>{ content }</div>
        </div>
      </div>
    )
  }