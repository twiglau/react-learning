import React, { useState } from 'react'

export default function Counter1() {
    /**
     * Hook: useState
     * > 本身是一个函数, 来自 react 包
     * > 有参数和返回值
     * > 参数: 作用是给创建出来的状态一个默认值
     * > 返回值: 数组
     *     * 元素1: 当前 state 的值
     *     * 元素2: 设置新的值是, 使用的一个函数
     */
    const [counter, setCounter] = useState(0);
    return (
        <div>
            <h2>当前计数: {counter}</h2>
            <button onClick={e => setCounter(counter + 1)}> +1</button>
            <button onClick={e => setCounter(counter - 1)}> -1</button>
        </div>
    )
}

/**
 * 两个额外的规则:
 * 1. 只能在函数最外层调用 Hook. 不要在循环, 条件判断 或者 子函数中调用.
 * 2. 只能在 React 的函数组件中 调用 Hook. 不要在其他 JavaScript 函数中调用.
 */
