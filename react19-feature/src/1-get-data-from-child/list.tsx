import { getUsersInfo } from "@/utils/api";
import { use, useEffect } from "react";



export default function CurrentList({promise, onCompleted}:{
  promise: ReturnType<typeof getUsersInfo>,
  onCompleted: (count:number) => unknown
}) {
  const users = use(promise)
  
  /**
   * 2. 子组件在执行 onCompleted 的时候，
   * 把父组件需要的数据作为参数返回出来即可。
   * 
   * 3. 这里我们需要考虑的一个问题是： onCompleted 的执行时机要怎么比较合适？
   * 因为 onCompleted 中执行在父组件中，子组件无法控制，
   * 因此父组件的执行逻辑有可能会导致子组件 re-render, 因此我们可以简单使用
   * useEffect 来防止 onCompleted 反复执行。
   */
  useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onCompleted && onCompleted(users.length)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='space-y-2'>
      {users.map(item => (
        <div key={item.id} className="flex border rounded p-4 items-center border-gray-200">
          <img className='size-14 rounded-full' src={item.url} alt='' />
          <div className='flex ml-4'>
            <div className="font-bold">{item.url}</div>
            <div className="text-gray-400 text-sm mt-1 line-clamp-1">{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}