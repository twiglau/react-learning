/**
 * 瀑布流式的接口请求交互方式. -> 也就是上一个模块请求成功之后,再请求下一个模块 
 * - 可以利用 Suspense 的嵌套来轻松做到这个事情. 
 */

import { use, useState, Suspense } from 'react'
import Skeleton from '../Skeletion'
import { fetchList } from '../api'
import List from '../List'

export default function Example() {
    const [promise,] = useState(() => fetchList(3))
    return (
        <div>
            <Suspense fallback={<Skeleton type='card' />}>
               <AccountUse promise={promise} />
            </Suspense>
        </div>
    )
}

function AccountUse(props) {
    const { results } = use(props.promise)
    const [promise,] = useState(() => fetchList(5))

    return (
        <div className='border border-blue-100'>
            <div className='flex space-x-4'>
                {results.map((item,index) => (
                    <div className='flex-1 over-flow-hidden' key={`z-${index}`}>
                        <div style={{backgroundImage: `url(${item.picture.large})`}}></div>
                        <div className='mt-4 font-bold'>{item.name.last}</div>
                        <div className='mt-1 text-gray-400 text-sm'>{item.email}</div>
                    </div>
                ))}
            </div>
            <div className='mt-8 text-gray-400 text-sm'>Account users</div>
            <Suspense fallback={<Skeleton />}>
               <List promise={promise} />
            </Suspense>
        </div>
    )
}