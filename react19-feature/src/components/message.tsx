import { getMessage } from '@/utils/api'
import { PenBox, Tent } from 'lucide-react'
import { use } from 'react'

const Message = (props: { message: string}) => {
  const message = props.message
  return (
    <div className='flex border border-gray-200 p-4 rounded-2xl items-start'>
      <Tent />
      <div className='flex-1 ml-3'>
        <div>React introduction</div>
        <div className='text-sm leading-6 mt-2 text-gray-600'>
          {message}
        </div>
      </div>
    </div>
  )
}

export default Message


/**
 * 定义一个子组件，接受一个 promise 作为参数。 然后在组件内部， 我们使用 use 读取该 promise 中的值。
 * @param props 
 * @returns 
 */
export const Message01 = (props: { promise: ReturnType<typeof getMessage>}) => {
  const message = use(props.promise)

  return (
    <div className='flex border border-gray-200 p-4 rounded-2xl items-start'>
      <PenBox />
      <div className='flex-1 ml-3'>
        <div>React Message01</div>
        <div className='text-sm leading-6 mt-2 text-gray-600'>
          {message.value}
        </div>
      </div>
    </div>
  )
}

