/**
 * 1. 做个小的需求改动,需要在初始化时请求数据. 此时同时需要初始化和更新的逻辑
 * 
 * 注意:
 * const [ promise, update ] = useState(getMessage())
 * - 以上代码,如果不考虑 Compiler 编译之后的代码去缓存初始化时的 getMessage()
 * - 那么每次更新组件时, 该方法都会执行一次,因此,会导致冗余的接口请求. 
 * - 使用 Compiler 编译之后, 这段代码会被缓存下来而不会重复执行 
 * 
 * 因此, 最好的方式是进一步调整,利用 useState 的初始化机制修改如下: 
 * const [ promise, update ] = useState(getMessage)
 * 这样,即使不用 Compiler 编译缓存, 也不会出现冗余请求的情况. 
 */

import { use, useState, Suspense } from 'react'
import Message from './Message'
import Skeleton from './Skeletion'
import Button from './Button'
import { getMessage } from './api'

export default function Demo01() {
    // 给状态 promise 赋值一个 Promise 对象作为初始值.
    const [ promise, update ] = useState(getMessage)

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
    
    const { value } = use(promise)
    return (
        <Message message={value} />
    )
}