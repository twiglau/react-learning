/**
 * 1. 当我们要更新数据时, 不再需要设计一个 loading 状态去记录数据是否正在发生请求行为, 因为 Suspense 帮助我们解决了 Loading 组件的显示问题. 
 * 2. use() 又帮助我们解决了数据获取的问题. 
 * 3. 这个时候, 我们也不需要设计一个状态去存储数据
 * 4. 可以把 创建的 promise 作为状态值 来触发组件的重新执行. 每次点击, 我们都需要创建新的 promise. 
 * 
 * 注意:
 * > 1. 当前组件的更新,更上层的父组件是否发生了变化. 可以在App组件中执行一次打印. (上层组件并不会重新执行)
 * - 结论: 更简洁的状态设计, 有利于命中 React 默认的性能优化规则
 * > 2. 需要注意子组件 Content 的实现
 * > 2.1 我们初始化时, 给状态 promise 赋予的默认值是 null. 之后,我们就将状态 promise 传给了 子组件 Content
 * > 如果直接把 promsie 传给了 use, 肯定会报错
 */

import { use, useState, Suspense } from 'react'
import Message from './Message'
import Skeleton from './Skeletion'
import Button from './Button'
import { getMessage } from './api'

export default function Demo01() {
    const [ promise, update ] = useState(null)

    function __handler() {
        update(getMessage())
    }

    return (
        <>
           <div>
              <Button onClick={__handler}>更新数据</Button>
           </div>
           <Suspense fallback={<Skeleton />}>
              <Content promise={promise} />
           </Suspense>
        </>
    )
}

function Content(props) {
    const { promise } = props
    if(!promise) {
        return <Message message='' />
    }
    const { value } = use(promise)
    return (
        <Message message={value} />
    )
}