/**
 * 初始获取数据并更新
 * 
 * 此时同时需要初始化 和 更新的逻辑
 */

import Message, { Message01 } from "@/components/message";
import Skeleton from "@/components/skeleton";
import { getMessage } from "@/utils/api";
import { Suspense, useEffect, useState } from "react";

export default function Page03() {
  /**
   * 如果不考虑Compiler 编译之后的代码去缓存初始化时的 getMessage(),
   * 那么每次更新组件时， 该方法都会执行一次， 因此，会导致冗余的接口请求。
   * 
   * - 使用Compiler编译之后，这端代码会被缓存下来而不会重复执行
   * 
   * 我们期望的是 useState 中的初始化方法仅在组件首次渲染时执行一次， 因此
   * 最好的方式是进一步调整一下， 利用 useState 的初始化机制修改
   */
  // const [promise, update] = useState(getMessage())

  // 这样，即使不用 Compiler 编译缓存， 也不会出现冗余请求的情况。
  // - "更简洁的状态设计， 有利于命中 React 默认的性能优化规则."
  const [promise, update] = useState(getMessage)

  console.log('Page03 执行了~')

  function __handler() {
    update(getMessage())
  }

  return (
    <>
     <div className='text-right mb-4'>
      <button className='button' onClick={__handler}>更新数据</button>
     </div>
     <Suspense fallback={<Skeleton />}>
       <Message01 promise={promise} />
     </Suspense>
    </>
  )
}

/**
 * 旧版本实现
 * 由于接口数据的触发方式不同，因此我们需要分别处理这两种触发时机
 */
export function Page04() {
   // 1. 定义两个状态管理数据结果和loading状态
   const [content,update] = useState({value:''})
   const [loading,setLoading] = useState(true)
   // 2. 利用useEffect来实现初始化时的数据请求逻辑
   useEffect(() =>{
    getMessage().then(res => {
      update(res)
      setLoading(false)
    })
   },[])
   // 3. 点击事件触发时，我们通过回调函数来实现数据的更新
   function __handler() {
    setLoading(true)
    getMessage().then(res => {
      update(res)
      setLoading(false)
    })
   }

   return (
    <>
      <div className='text-right mb-4'>
        <button className='button' onClick={__handler}>更新数据</button>
      </div>
      {loading ? <Skeleton /> : <Message message={content.value} />}
    </>
   )
}