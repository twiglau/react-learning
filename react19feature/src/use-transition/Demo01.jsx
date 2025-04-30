import { useState, useTransition, Suspense, use } from "react";
import { getMessage } from "../api";
import Button from "../Button";
import Spin from "../use-deferred-value/Spin"
import Skeleton from "../Skeletion";
import Message from "../use-promise/Message";

/**
 * 需要注意: 
 * 1. 被调低的不是 set 方法本身的执行, 而是其对应的 UI 更新. 
 * 2. 因此,当我们连续点击 10 次按钮时, update 就紧跟着执行 10 次. 只是
 * 目前的 Suspense 的机制中, 会将 10 次接口请求串行执行. 
 * 3. 当试图使用这种方案取消上一次请求时, 我们会发现并没有效果, 这里的原因是因为状态
 * promise在update执行完之后, 就已经交给 Suspense 的机制去处理了, React并没有支持这种中断机制 
 * 
 * 4. 因此, 我们可以像办法在 promise 交给 Suspense 处理之前中端请求, 在上一章中, 我们使用
 * useDeferredValue 机制做到了这个事情
 * 
 * export default function App() {
 *     const [promise, update] = useState(() => fetchListWithCancel(5))
 *     const deferred = useDeferredValue(promise)
 * 
 *     function __inputChange(e) {
 *         promise.cancel()
 *         const len = e.target.value.length % 5
 *         update(fetchListWithCancel(5))
 *     }
 * }
 * 
 * 4.1 可以发现, 第一时间交给 Suspense 的处理的并不是 promise, 而是 deferred, 因此,
 * 我们可以在这之前, 中断请求
 * 4.2 除了这个区别, useTransition 可以在组件顶层同时将多个 state 的 set 方法设置为低优先级. 
 * 这一点是 useDeferredValue 做不到的 
 * 
 * function TabContainer() {
 *     const [isPending, startTransition] = useTransition()
 *     const [tab, setTab] = useState('about')
 *     const [other, setOther] = useState(false)
 * 
 *     function selectTab(nextTab) {
 *          startTransition(() => {
 *              setTab(nextTab)
 *              setOther(false)
 *          })
 *     }
 * }
 * 
 * 
 * 5. useDeferredValue 可以在子组件中, 设置来自 props 的状态延迟. 这个也是 useTransition 不方便做到的 
 * export default function Ex(props) {
 *     const deferred = useDeferredValue(props.value)
 * }
 */
export default function Demo01() {
    const [ promise, update ] = useState(getMessage)
    const [ isPending, startTransition ] = useTransition()

    function __handler() {
        startTransition(() => {
            // promise.cancel()  不起作用
            update(getMessage())
        })
    }

    return (
        <>
          <div className='text-right mb-4'>
            <Button disabled={isPending} onClick={__handler}>更新数据</Button>
          </div>
          <Suspense fallback={<Skeleton />}>
            <Spin loading={isPending}>
                <Content promise={promise} />
            </Spin>
          </Suspense>
        </>
    )
}

function Content(props) {
    const { value } = use(props.promise)

    return (
        <Message message={value} />
    )
}