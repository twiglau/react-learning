import Skeleton from "@/components/skeleton"
import { getUserInfo } from "@/utils/api"
import { use } from 'react'
import Userinfo from "./userinfo"

export interface UserInfo {
  username?: string,
  value?:string,
  id?:string,
  type?:string
}

export default function List(props: { list: UserInfo[] }) {
  const list = props.list
  return (
    <div className="space-y-4">
      {list.map((item,index) => {
        if(item.type == 'loading') {
          return <Skeleton key={`loading-${index}`}/>
        } 
        return <Userinfo index={index} username={item.id} message={item.value} key={item.id} />
      })}
    </div>
  )
}

export function CurrentList({promise}:{
  promise: ReturnType<typeof getUserInfo>
}) {
  const users = use(promise)
  return (
    <div className='mb-4'>
      {users.map(item => (
        <div key={item.id} className='flex border-b py-4 mx-4 items-center border-dashed border-gray-300'>
          <img className='size-14 rounded-full' src={item.url} alt='' />
          <div className='flex-1 ml-4'>
            <div className='font-bold'>{item.id}</div>
            <div className='text-gray-400 text-sm mt-1 line-clamp-1'>{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}