/**
 * 点击按钮更新数据
 * 表现为：
 * 初始化时没有请求， 所以组件显示为 空数据样式。 当我们点击按钮时请求一条数据，数据更新，
 * 请求成功之后显示更新之后的内容。
 * 
 * 这里有个非常关键地方在于
 * 
 * 1. 当我们更新数据时，我们不在需要设计一个 loading 状态去记录数据是否正在发生请求行为，
 * 因为 Suspense 帮助我们解决了 Loading 组件的显示问题。
 * 2. 与此同时，use() 又帮助我们解决了数据获取的问题。
 * 3. 这个时候，好像我们也不需要设计一个状态去存储数据。
 * 
 * 这时应该怎么处理？
 * 这里有个非常巧妙的方式， 就是把 创建的promise作为状态值 来触发组件的重新执行。
 * 每次点击，我们都需要创建新的 promise
 */

import { Message02 } from "@/components/message";
import Skeleton from "@/components/skeleton";
import { getMessage } from "@/utils/api";
import { Suspense, useState } from "react";

export default function Page02() {
  // 记住这个初始值，
  const [promise,update] = useState<ReturnType<typeof getMessage>>()
  // 这个时候，当我们点击事件执行时，则只需要执行如下代码去触发组件的更新即可。
  function __handler() {
    update(getMessage())
  }

  return (
    <>
     <div className='text-right mb-4'>
      <button className='button' onClick={__handler}>更新数据</button>
     </div>
     <Suspense fallback={<Skeleton />}>
       <Message02 promise={promise} />
     </Suspense>
    </>
  )
}