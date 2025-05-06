import Skeleton from "@/components/skeleton";
import { getUsersInfo } from "@/utils/api";
import { Suspense } from "react";
import Account from "./account";

/**
 * 如案例演示
 * 有的时候，我们需要这种 瀑布流式 的接口请求交互方式。也就是上一个模块请求成功之后，再请求下一个模块。
 * 
 * 我们可以利用 Suspense 的嵌套来轻松做到这个事情。
 * 
 * 1. 我们可以在父组件中，通过一个promise向子组件传递数据
 * 2. 然后在子组件Account中，使用同样的方式向子组件传递数据
 * 3. 最后在之后的子组件List中仅使用 use 获取数据即可。
 * @returns 
 */

export default function Nest() {
  const promise = getUsersInfo()

  return (
    <div>
      <Suspense fallback={<Skeleton type='card' />}>
        <Account promise={promise} />
      </Suspense>
    </div>
  )
}