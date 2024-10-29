import { use } from 'react'


const _api3 = () => {
    return new Promise((resolve) => {
        resolve({ value: '_api3' })
    })
}
// Uncaught Error: async/await is not yet supported in Client Components, only Server Components. 
// This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.
// 函数运行创建 Promise 对象, 虽然 _api3 执行之后会立即返回一个带有 resolve 结果状态的 Promise.
// 但是, use 并不能第一时间读取到其值.

export default function Bad() {
    const result = use(_api3())
    return (
        <>
         <div>{ result.value }</div>
        </>
    )
}