import { use } from 'react'

export default function CurrentList({promise}) {
    const { results } = use(promise)

    console.log('CurrentList 会执行几次')

    return (
        <div>
            {results.map((item, i) => (
                <div key={`h${i}`} className='flex border p-4 items-center my-4 rounded-md'>
                    <img className='w-12 h-12 rounded-full' src={item.picture.large} alt='' />
                    <div className='flex-1 ml-4'>
                        <div className='font-bold'>{item.name.last}</div>
                        <div className='text-gray-400 mt-l text-sm line-clamp-1'>react 19 re. a deisign language for background applications</div>
                    </div>
                </div>
            ))}
        </div>
    )
}