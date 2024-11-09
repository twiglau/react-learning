import { useState, Suspense } from 'react'
import Skeleton from '../Skeletion'
import { fetchListWithCancel } from '../api'
import Tabs from '../Tabs'
import List from '../List'


const tabs = [
    { name: 'My Account', href: '#', current: true },
    { name: 'Company', href: '#', current: false },
    { name: 'Team Members', href: '#', current: false },
    { name: 'Billing', href: '#', current: false }
]

export default function Example() {
    const [current, switchToSelected] = useState(0)
    const [promise, update] = useState(()=> fetchListWithCancel(5))

    function __handler(index) {

        tabs[current].current = false
        tabs[index].current = true
        switchToSelected(index)

        promise.cancel()
        const len = Math.floor(Math.random() * 10)
        update(fetchListWithCancel(len))
    }

    return (
        <div>
            <Tabs tabs={tabs} onSwitch={__handler} />

            <Suspense fallback={<Skeleton />}>
                <List promise={promise} />
            </Suspense>
        </div>
    )
}