import { use } from 'react'
import { Context } from './theme-context'

export default function Total() {
    const { count } = use(Context)

    return (
        <div>
            <h3 className='font-bold'>Total Switch Count</h3>
            <p className='!text-gray-400'>所有组件切换次数: <span className='text-green-500'>{count}</span></p>
        </div>
    )
}