


import Input from '@/components/input'
import Skeleton from '@/components/skeleton'
import Spin from '@/components/spin'
import { getUsersInfo } from '@/utils/api'
import { Suspense, useDeferredValue, useState } from 'react'
import List from './list'

export default function Search() {
  const [promise, update] = useState(getUsersInfo)
  const deferred = useDeferredValue(promise)

  const __inputChange = () => {
    promise.cancel()
    update(getUsersInfo())
  }

  return (
    <div className='space-x-2'>
      <Input onChange={__inputChange} placeholder='Enter something' />
      <Suspense fallback={<Skeleton />}>     
         <Spin loading={deferred !== promise}>
          <List promise={deferred} />
         </Spin>
      </Suspense>
    </div>
  )
}
