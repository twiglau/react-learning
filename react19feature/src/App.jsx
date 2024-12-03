import {  Suspense } from 'react'
import Button from './Button.jsx'
import Skeleton from './Skeletion.jsx'
import Message from './use-promise/Message.jsx'
import Good from './use-promise/good.jsx'
// import Bad from './bad.jsx'
import Async from './use-promise/Async.jsx'
import Condition from './use-promise/Condition.jsx'
import SuspenseComp from './use-promise/Suspense.jsx'
import Normal from './use-promise/Normal.jsx'
import ClickUpdateData from './use-promise/ClickUpdateData.jsx'
import InitialRequestAndUpdate from './use-promise/InitialRequestAndUpdate.jsx'
import RequestAndAddDataToList from './use-promise/RequestAndAddDataToList.jsx'
import PageListLoadMore from './use-promise/PageListLoadMore.jsx'
import Search from './Search.jsx'
import TabNormalLoad from './use-promise/TabNormalLoad.jsx'
import TabCacheLoad from './use-promise/TabCacheLoad.jsx'
import ParentGetData from './use-promise/ParentGetData.jsx'
import SuspenseNest from './use-promise/SuspenseNest.jsx'
import RefChange1, { Demo02, Demo03, Demo04 } from './use-context/ref-change.jsx'
import Comment from './use-context/Comment.jsx'
import Task from './use-context/Task.jsx'
import Test from './use-context/TestDialog.jsx'
import TodoList from './use-context/todoList.jsx'
import ThemeChange from './use-context/theme-change.jsx'
import DeferredDemo from './use-deferred-value/DeferredDemo.jsx'
import TransitionDemo01 from './use-transition/Demo01.jsx'
import TransitionDemo02 from './use-transition/Demo02.jsx'
import TransitionDemo03 from './use-transition/Demo03.jsx'
import FormDemo01 from './form-action/Demo01.jsx'
import FormDemo02 from './form-action/Demo02.jsx'
import FormDemo03 from './form-action/Demo03.jsx'
import FormDemo04 from './form-action2/Demo02.jsx'
import OptDemo01 from './use-optimistic/Demo01.jsx'
import OptDemo02 from './use-optimistic/Demo02.jsx'
import OptDemo04 from './use-optimistic/Demo04.jsx'

import { getMessage } from './api.js'

export default function Index() {
  const promise = getMessage()
  console.log('App 组件更新了')
  return (
    <>
      <div>
        <h5>22. useOptimistic 的使用</h5>
        <OptDemo01 />
        <OptDemo02 />
        <OptDemo04 />
        <h5>21. form action 使用</h5>
        <FormDemo01 />
        <FormDemo02 />
        <FormDemo03 />
        <FormDemo04 />
        <h5>20. useTransition 使用</h5>
        <TransitionDemo01 />
        <TransitionDemo02 />
        <TransitionDemo03 />
        <h5>19. useDeferredValue 使用</h5>
        <DeferredDemo />
        <h5>18. use 和 context 的使用</h5>
        <TodoList />
        <ThemeChange />
        <h5>17. 自定义弹窗 </h5>
        <Task />
        <Test />
        <h5>16. Ref 调整 </h5>
        <RefChange1 />
        <Demo02 />
        <Demo03 />
        <Demo04 />
        <Comment />
        <h5>15. Suspense嵌套 </h5>
        <SuspenseNest />
        <h5>14. 父级获取数据</h5>
        <ParentGetData />
        <h5>13. tab缓存切换</h5>
        <TabCacheLoad />
        <h5>12. tab简单切换</h5>
        <TabNormalLoad />
        <h4>11. 搜索</h4>
        <Search />
        <h4>10. 分页列表加载更多</h4>
        <PageListLoadMore />
        <h4>9. 请求并新增到列表</h4>
        <RequestAndAddDataToList />
        <h4>8. 初始化请求并更新</h4>
        <InitialRequestAndUpdate />
        <h4>7. 点击更新数据</h4>
        <ClickUpdateData />
        <h4>6. Suspense 普通组件</h4>
        <Normal />
        <h4>5. Suspense 和 use 搭配使用</h4>
        <SuspenseComp />
        <h4>4. 可以在if等条件语句中使用</h4>
        <Condition />
        <h4>3. 异步处理</h4>
        <Async />
        <h4>2. 不能拿到结果渲染</h4>
        {/* <Bad /> */}
        <h5>Demo:</h5>
        <h4>1. 直接拿到结果渲染</h4>
        <Good />
        
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


