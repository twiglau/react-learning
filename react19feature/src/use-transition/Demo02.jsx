
import { useState, Suspense, useTransition } from 'react'
import Skeleton from '../Skeletion'
import { fetchListWithCancel } from '../api'
import Tabs from '../Tabs'
import List from '../use-deferred-value/List'
import Spin from '../use-deferred-value/Spin'

const tabs = [
    {name: 'My Account', href: '#', current: true },
    {name: 'Company', href: '#', current: false },
    {name: 'Team Members', href: '#', current: false },
    {name: 'Billing', href: '#', current: false }
]
export default function Demo02() {
    const [current, switchToSelected] = useState(0)
    const [promise,update] = useState(() => fetchListWithCancel(5))
    const [isPending, startTransition] = useTransition()

    function __handler(index) {
        tabs[current].current = false
        tabs[index].current = true
        switchToSelected(index)

        promise.cancel()
        startTransition(() => {
            update(fetchListWithCancel(5))
        })
    }

    return (
        <div>
            <Tabs tabs={tabs} onSwitch={__handler} />
            <Suspense fallback={<Skeleton />}>
               <Spin loading={isPending} type='mask'>
                <List promise={promise} />
               </Spin>
            </Suspense>
        </div>
    )
}