import {  Suspense } from 'react'
import Button from './Button.jsx'
import Skeleton from './Skeletion.jsx'
import Message from './Message.jsx'
import Good from './good.jsx'
// import Bad from './bad.jsx'
import Async from './Async.jsx'

import { getMessage } from './api.js'

export default function Index() {
  const promise = getMessage()
  return (
    <>
      <Suspense fallback={<Skeleton />}>
         <Message promise={promise} />
      </Suspense>
      <div>
        <h5>Demo:</h5>
        <Good />
        {/* <Bad /> */}
        <Async />
      </div>
      <div>
        <Button>重置</Button>
      </div>
    </>
  )
}


