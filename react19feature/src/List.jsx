import { use } from 'react'
export default function CurrentList({promise}) {
    const { results } = use(promise)

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