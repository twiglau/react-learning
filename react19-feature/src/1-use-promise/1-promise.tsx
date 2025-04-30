import Message from "@/components/message"
import Skeleton from "@/components/skeleton"
import { createRandomMessage } from "@/utils"
import { use, useState } from "react"

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