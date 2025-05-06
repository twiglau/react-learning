import Input from '@/components/input'
import Skeleton from "@/components/skeleton"
import { getUsersInfo } from "@/utils/api"
import { Suspense, useState } from "react"
import { CurrentList01 } from "./list"

/**
 * 观察接口请求情况。
 * 我们发现， 当快速输入时，此时会发起多个接口请求。
 * React会帮助我们解决竞态的问题，将接口任务一次拍好执行。
 * 
 * 但是在请求结果的获取上，反馈到页面上只会获取最后一次请求的结果。
 * @returns 
 */
const Index01 = () => {
  const [promise, update] = useState(getUsersInfo)

  const __inputChange = () => {
    promise.cancel()
    update(getUsersInfo())
  }

  return (
    <div className='space-y-2'>
      <Input onChange={__inputChange} placeholder='Enter your keywords' />
      <Suspense fallback={<Skeleton />}>
        <CurrentList01 promise={promise} />
      </Suspense>
    </div>
  )
}

export default Index01