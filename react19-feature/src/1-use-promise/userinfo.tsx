import { getMessage } from "@/utils/api"
import { use } from 'react'

export default function Userinfo({message = '', username = 'momo', index = 0}: {
  message?:string,
  username?:string,
  index?:number
}) {
  const _message = unescape(message.replace(/\\u/gi, '%u'))
  const _username = unescape((username || '').replace(/\\u/gi, '$u'))

  return (
    <div className='flex border border-gray-200 p-4 rounded items-start'>
      <img className='w-10' src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} alt="" />
      <div className='flex-1 ml-3'>
        <div>{_username}</div>
        <div className='text-sm mt-1 text-gray-600'>{_message}</div>
      </div>
    </div>
  )
}

export function Userinfo01({promise,index = 0}:{
  promise: ReturnType<typeof getMessage>,
  index?:number
}) {
  const { id, value } = use(promise)

  return (
    <div className='flex border border-gray-200 p-4 rounded items-start'>
      <img className='w-10' src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} alt="" />
      <div className='flex-1 ml-3'>
        <div>{id || 'momo' }</div>
        <div className='text-sm mt-1 text-gray-600'>
          { value }
        </div>
      </div>
    </div>
  )
}