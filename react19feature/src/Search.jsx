import { useState, Suspense } from 'react'
import { fetchListWithCancel } from './api'
import Skeleton from './Skeletion'
import List from './List'

export default function Demo01() {
    const [promise, update] = useState(()=> fetchListWithCancel(10))

    function __inputChange(e) {
        promise.cancel()

        const len = e.target.value.length % 10
        update(fetchListWithCancel(len))
    }

    return (
        <div>
            <input onChange={__inputChange} placeholder='Enter something' />
            <Suspense fallback={<Skeleton />}>
               <List promise={promise} />
            </Suspense>
        </div>
    )
}