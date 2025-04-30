import Message from "@/components/message"
import Skeleton from "@/components/skeleton"
import { createRandomMessage } from "@/utils"
import { getMessage } from "@/utils/api"
import { use, useRef, useState } from "react"

const __api = new Promise<{ value: string}>((resolve) => {
  resolve({ value: createRandomMessage() })
})
const __api2 = () => {
  // 虽然， __api2 执行后，会立即返回一个带有 resolve 结果状态的 promise,
  // 但是 use 并不能第一个时间读取到其值。
  return new Promise<{value: string}>(resolve => {
    resolve({ value: createRandomMessage() })
  })
}

export default function Demo01() {
  const result = use(__api)
  return (
    <Message message={result.value} />
  )
}

export function Demo02() {
  const result = use(__api2())
  return (
    <Message message={result.value} />
  )
}

/**
 * 在条件语句中合循环语句中使用
 * @returns 
 */
export function Demo03() {
  const [loading, setLoading] = useState(false)
  let result = { value: '' }
  if(!loading) {
    result = use(__api)
  }
  console.log('Demo03 ---')

  return (      
    <>
     {loading ? <Skeleton /> : <Message message={result.value} />}
     <div className="mt-4 text-right">
      <button className="button" onClick={() => setLoading(!loading)}>切换</button>
     </div>
    </>
  )
}

/**
 * 3. 在异步请求中使用
 * 通常， 在处理异步请求时，会结合 promise 来使用， 但是我们不能直接使用 use 来
 * 读取异步请求中的 promise, 因为我们已经非常明确， use 只能读取有确定 resolve 
 * 结果的 promise 的值。 但是有可能第一时间异步请求包装的 promise 状态为 pending.
 * 
 * 因此在这种情况下，我们必须结合 Suspense 来使用。
 * 
 * 目前版本中，并不能合理的处理好这种风险的读取方式， 虽然我们最终
 * 读取到了 promise 中的值， 内容也顺利渲染出来了，但是中间存在一次
 * 明显的闪烁。 这种体验非常糟糕。
 */
export  function Demo04() {
  const [loading, setLoading] = useState(true)

  const promise = useRef(getMessage().then( res => {
    setLoading(false)
    return res
  }))

  let result = { value: '' }

  if(!loading) {
    result = use(promise.current)
    return <Message message={result.value} />
  }

  return <Skeleton />
}