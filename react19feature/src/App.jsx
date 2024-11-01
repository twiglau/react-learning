import {  Suspense } from 'react'
import Button from './Button.jsx'
import Skeleton from './Skeletion.jsx'
import Message from './Message.jsx'
import Good from './good.jsx'
// import Bad from './bad.jsx'
import Async from './Async.jsx'
import Condition from './Condition.jsx'
import SuspenseComp from './Suspense.jsx'
import Normal from './Normal.jsx'
import ClickUpdateData from './ClickUpdateData.jsx'

import { getMessage } from './api.js'

export default function Index() {
  const promise = getMessage()
  return (
    <>
      <div>
        <h5>Demo:</h5>
        <h4>1. 直接拿到结果渲染</h4>
        <Good />
        <h4>2. 不能拿到结果渲染</h4>
        {/* <Bad /> */}
        <h4>3. 异步处理</h4>
        <Async />
        <h4>4. 可以在if等条件语句中使用</h4>
        <Condition />
        <h4>5. Suspense 和 use 搭配使用</h4>
        <SuspenseComp />
        <h4>6. Suspense 普通组件</h4>
        <Normal />
        <h4>7. 点击更新数据</h4>
        <ClickUpdateData />
      </div>
      <div style={{ borderTop: 'solid 2px #000',marginTop: '20px',textAlign: 'center'}}>
        分割线
      </div>
      <Suspense fallback={<Skeleton />}>
         <Message promise={promise} />
      </Suspense>
      <div>
        <Button>重置</Button>
      </div>
    </>
  )
}


