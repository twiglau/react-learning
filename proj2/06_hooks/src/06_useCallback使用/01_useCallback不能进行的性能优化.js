import React, { useCallback, useMemo, useState } from 'react'

export default function CallbackDemo1() {
    const [count, setCount] = useState(0);
    // 两种方式 都有函数的创建过程
    // useCallback 不存在任何性能优化
    // 1
    const increment1 = () => {
        console.log('执行 increment1 函数')
        setCount(count + 1);
    }
    // 闭包引用外部变量, 值引用最开始时候的一次
    // 2
    const increment2 = useCallback(() => {
        console.log('执行 increment2 函数')
        setCount(count + 1);
    },[]);

    return (
        <div>
            <h2>Demo1 {count}</h2>
            <button onClick={increment1}>+1</button>
            <button onClick={increment2}>+1</button>
        </div>
    )
}
