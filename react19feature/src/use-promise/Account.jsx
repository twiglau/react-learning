import clsx from "clsx";
import { Suspense, useState } from 'react'
import Skeleton from "../Skeletion";
import { fetchListWithCancel} from '../api'
import List from '../List'


export default function Account(props) {
    const [promise, update ] = useState(() => fetchListWithCancel(5))

    const cls = clsx('pt-4', {
        ['hidden']: !props.selected
    })

    return (
        <div className={cls}>
            <Suspense fallback={<Skeleton />}>
               <List promise={promise} />
            </Suspense>
        </div>
    )
}
