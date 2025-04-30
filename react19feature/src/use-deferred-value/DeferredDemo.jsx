import { Suspense, useDeferredValue, useState } from 'react'
import Spin from './Spin'
import Skeleton from '../Skeletion'
import { fetchListWithCancel } from '../api'
import List from './List'
import Input from '../Input'
import Demo01 from './Demo1'
import Demo02 from './Demo2'
import Demo03 from './Demo3'
import Demo04 from './Demo4'

/**
# 流程
1. 初始化时, 显示 Skeleton 组件, 表示此列表中没有内容, 即将加载新的内容进来.
2. 更新时,保持现有列表, 可在此的基础上显示 loading/蒙层/透明度. 如果你确定接口请求的时间非常短, 也可以没有任何 Loading 显示.

## useDeferredValue
1. 在 React 并发模式的基础之上, 可以利用 useDeferredValue 在不变动代码顺序情况下, 推迟指定 UI 更新任务的执行.
2. 这里我们将 promise 做为 state, 当 promise 被重新赋值时, List 会经历两次更新. 
首先点击事件触发. 请求立即发生. promise被改变, 触发组件更新. 
2.1 第一次更新时, deferred 使用旧值传参, 此时对于 List 而言, api 没有发生变化. 因此, 利用这个机制, 我们可以阻止
Suspense 直接渲染成 fallback.
2.2 在Suspense包裹之下, 只有当接口请求成功之后, deferred 的第二次更新才会发生.
因此, 在这个过程中, 如果我们快速进行第二次点击. 可以直接取消上一次请求,让第二次更新来不及执行. 此时新的请求发生. 
 */
export default function Demo() {
    const [ promise, update ] = useState(() => fetchListWithCancel(5))
    const deferred = useDeferredValue(promise)

    function __inputChange(e) {
        promise.cancel()
        const len = e.target.value.length % 5
        update(fetchListWithCancel(len))
    }

    return (
        <div>
            <Input onChange={__inputChange} placeholder='Enter something' />
            <Suspense fallback={<Skeleton />}>
               <Spin loading={deferred !== promise}>
                  <List promise={deferred} />
               </Spin>
            </Suspense>
            <h5>正常情况下 Demo1:</h5>
            <Demo01 />
            <hr />
            <h5>延时执行 Demo2:</h5>
            <Demo02 />
            <h5>模拟延时 Demo3:</h5>
            <Demo03 />
            <hr />
            <h5>模拟延时任务拆分方式 Demo4:</h5>
            <Demo04 />
            <hr />
        </div>
    )
}

