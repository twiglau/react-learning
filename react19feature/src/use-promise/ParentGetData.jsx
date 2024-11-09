import { useState, Suspense } from 'react'
import Skeleton from '../Skeletion'
import { fetchListWithCancel } from '../api'
import Tabs from '../Tabs'
import List from '../List'


const config = [
    { name: 'Applied', href: '#', count: 0, current: true },
    { name: 'Phone Screening', href: '#', count: 0, current: false },
    { name: 'Interview', href: '#', count: 0, current: false }
]

/**
 * 父组件要拿到子组件的数据, 可以给子组件传一个事件进去,让子组件在得到数据时,执行这个事件回调. 
 * 子组件在执行 onComplete 的时候, 把父组件需要的数据作为参数返回出来即可
 * @returns 
 */
export default function Example() {
    const [current, switchToSelected] = useState(0)
    const [promise, update] = useState(() => fetchListWithCancel(5))
    const [tabs, changeTabs] = useState(config)

    function __handler(index) {

        tabs[current].current = false
        tabs[index].current = true
        switchToSelected(index)

        promise.cancel()
        const len = Math.floor(Math.random() * 10)
        update(fetchListWithCancel(len))
    }

    function __complete(number) {
        tabs[current].count = number
        changeTabs([...tabs])
    }

    return (
        <div>
            <Tabs tabs={tabs} onSwitch={__handler} />

            <Suspense fallback={<Skeleton />}>
                <List promise={promise} onComplete={__complete} />
            </Suspense>
        </div>
    )
}