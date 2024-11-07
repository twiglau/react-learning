import { Suspense, useState } from 'react'
import { fetchList } from './api'
import Skeleton from './Skeletion'
import List from './List'
import Button from './Button'

const Index = () => {
    const [promises, increasePromise] = useState(() => [fetchList()])

    const onLoadMore = () => {
        increasePromise([...promises, fetchList()])
    }

    return (
        <>
           {
            promises.map((promise, i) => (
                <Suspense fallback={<Skeleton />} key={`hello ${i}`}>
                    <List promise={promise} />
                </Suspense>
            ))
           }
           <div className='text-center my-4'>
               <Button onClick={onLoadMore}>loading more</Button>
           </div>

        </>
    )
}

export default Index;