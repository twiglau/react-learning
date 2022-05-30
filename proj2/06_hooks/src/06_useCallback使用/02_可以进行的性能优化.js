import React, { useCallback, useState,memo } from 'react'

/**
 * useCallback 在什么时候使用?
 * 场景:
 * 在将一个组件中的函数, 传递给子元素进行回调使用是, 使用 useCallback 对函数进行处理.
 */
// 子组件不需要重新渲染
const HYButton = memo((props)=>{
    console.log('子组件 重新渲染',props.title)
    return <button onClick={props.increment}>+1</button>
})
export default function CallbackDemo1() {
    console.log('Demo2 重新渲染')
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(true);
    const increment1 = () => {
        console.log('执行 increment1 函数')
        setCount(count + 1);
    }
    // 引用 初始值 show , memo 进行比较时,并没有发生变化
    const increment2 = useCallback(() => {
        console.log('执行 increment2 函数')
        setCount(count + 1);
    },[count]);
    return (
        <div>
            <h2>Demo2 {count}</h2>
            {/* <button onClick={increment1}>+1</button>
            <button onClick={increment2}>+1</button> */}

            <HYButton title="btn1" increment={increment1}/>
            <HYButton title="btn2" increment={increment2}/>
            <button onClick={e => setShow(!show)}>show切换</button>
        </div>
    )
}
