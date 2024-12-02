import { useState } from 'react'

/**
 * 
 * Demo01: 注意: 状态 counter 被两个元素使用, 因此, 这两个元素的更改, 实际上是 一个任务. 
 * 他们必定会同时响应 counter 的变化. 
 */
export default function Index() {
    const [ counter, setCounter ] = useState(0)

    function __clickHandler() {
        setCounter(counter + 1)
    }

    return (
        <div className='flex justify-between items-center'>
            <div>
                <div>counter: {counter}</div>
                <div className='mt-4'>counter: {counter}</div>
            </div>
            <button onClick={__clickHandler}>counter++</button>
        </div>
    )
}