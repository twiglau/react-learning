import { useState, useDeferredValue } from 'react'

/**
 * 
 * Demo01: 注意: 状态 counter 被两个元素使用, 因此, 这两个元素的更改, 实际上是 一个任务. 
 * 他们必定会同时响应 counter 的变化. 
 * 
 * Demo02: 利用 useDeferredValue, 把他们拆分成两个任务. 
 * 
 * 此时, 第二个元素的更新, 就不再与第一个元素同步. 它更新的优先级被降低. 
 * 这个时候它的执行在理论上是可以被更高的优先级插队和中断的. 
 * 
 * 但是由于渲染都太短, 肉眼是无法区分出来两个任务已经被分开了. 
 */
export default function Index() {
    const [ counter, setCounter ] = useState(0)
    const deferred = useDeferredValue(counter)

    function __clickHandler() {
        setCounter(counter + 1)
    }

    return (
        <div className='flex justify-between items-center'>
            <div>
                <div>counter: {counter}</div>
                <div className='mt-4'>deferred counter: {deferred}</div>
            </div>
            <button onClick={__clickHandler}>counter++</button>
        </div>
    )
}