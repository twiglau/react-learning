import { use, useEffect } from 'react'
export default function CurrentList({promise, onComplete}) {
    const { results } = use(promise)

    /**
     * 这里我们需要考虑 onComplete 的执行时机要怎么比较合适. 因为如果onComplete中执行逻辑在父组件中,子组件无法控制,
     * 因此父组件的执行逻辑可能会导致 子组件re-render, 因此我们可以简单使用 useEffect 来防止 onComplete 反复执行
     */

    useEffect(() => {
        onComplete && onComplete(results.length)
    }, [results.length])

    return (
        <div>
            {
                results.map((item, i) => (
                    <div key={i} className='flex border-p py-4 mx-4 items-center border-dashed'>
                        <img className='w-14 h-14 rounded-full' src={item.picture.large} alt='' />
                        <div className='flex-l ml-4'>
                            <div className='font-bold'>{item.name.last}</div>
                            <div className='text-gray-400 mt-l text-sm line-clamp-l'>
                                react 19 repo, a design language for background applications
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}