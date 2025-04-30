import { useState, Suspense } from 'react'
import clsx from 'clsx'
import { fetchListWithCancel } from './api'
import Skeleton from './Skeletion'
import List from './List'

export default function Demo01(props) {
    const [promise, update] = useState(()=> fetchListWithCancel(10))

    function __inputChange(e) {
        promise.cancel()

        const len = e.target.value.length % 10
        update(fetchListWithCancel(len))
    }

    const cls = clsx('pt-4', {
        ['hidden']: !props.selected
    })

    return (
        <div className={cls}>
            <input onChange={__inputChange} placeholder='Enter something' />
            <Suspense fallback={<Skeleton />}>
               <List promise={promise} />
            </Suspense>
        </div>
    )
}