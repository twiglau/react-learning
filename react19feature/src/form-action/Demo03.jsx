import  { useActionState } from 'react'

/**
 * 1. useActionState 与 useState 的使用基本是一致的. 它同样可以用来定义一个状态. 
 * 不一样地方是, useActionState 需要结合 form action 使用, 它的更新机制依赖于 action . 
 * 
 * 1.1 useActionState 接收两个参数, 第一个参数是一个回调函数, 用于获取 action 传递过来的值. 
 * 第二个参数表示定义状态的初始值. 
 * 1.2 回调函数中, 也接收两个参数, 第一个参数表示当前状态值. 第二参数表示表单 action 提交传递过来
 * 的 FormData 值. 
 * 
 * 2. 需要特别注意的是, 我们可以轻松将 useActonState 的更新方法 increment 放到函数之外去. 
 * 这里一个好处是更利于于其他组件或者 server 进行交互. 在解耦上非常有用. 
 */

async function increment(cur) {
    return cur + 1
}

export default function Demo03() {
    const [ state, action ] = useActionState(increment, 0)

    return (
        <form action={action} className='flex items-center'>
            <button>count++</button>
            <div className='ml-4'>{state}</div>
        </form>
    )
}