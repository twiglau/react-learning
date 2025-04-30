/**
 * 如果直接使用 use 获取未直接 resolve 的 Promise 的值，
 * 会抛出一个异常。
 * 
 * 在实践中，大多数情况都是这种没有直接得到 Promise resolve 的结果状态，那我们该怎么处理？
 * 
 * 这个时候，可以利用 Suspense 来解决这个问题。
 */

import Message, { Message01 } from "@/components/message";
import Skeleton from "@/components/skeleton";
import { getMessage } from "@/utils/api";
import { Suspense, useEffect, useState } from "react";


/**
 * 1. Suspense 可以捕获 sue 无法读取数据时抛出的异常。
 * 然后此时会在页面上渲染回退组件 fallback
 * 
 * 防止错误溢出到更高级的组件。
 * 
 * 
 * 2. 在React19中，use(promise) 被设计成完全符合 Suspense 规范的hook, 因此我们可以轻松的结合他们两
 * 者来完成页面开发。当 use(promise) 读取数据失败时，会抛出一个异常交给 Suspense 捕获，此时Suspense
 * 会渲染 fallback 回退组件。 当请求成功之后，组件会重新渲染， 此时 use(promise) 则可以读取到正确的值。
 */

export default function Page() {
  const promise = getMessage()

  return (
    <Suspense fallback={<Skeleton />}>
      <Message01 promise={promise} />
    </Suspense>
  )
}

/**
 * 3. 借助 state useEffect 的实现方式，体会差别
 * 
 * 很明显，新的方式 use + Suspense, 代码更加简洁。
 * 除此之外， 在严格模式下，开发环境组件首次加载会执行两次， 因此我们还需要想额外的方法阻止重复执行。
 * 代码会变得更加冗余。 
 * 一个很明显的差别就是 Suspense + use 的方式会自动帮助我们弃用第二次的请求数据。而使用 useEffect 
 * 则需要我们自己来处理防止重复请求的逻辑。
 */

export function Page01() {
  const [content, update] = useState({ value: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMessage().then(res => {
      update(res)
      setLoading(false)
    })
  }, [])

  if(loading) {
    return <Skeleton />
  }
  return <Message message={content.value} />
}

