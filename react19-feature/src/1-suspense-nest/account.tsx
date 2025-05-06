import Skeleton from '@/components/skeleton';
import { getUsersInfo } from "@/utils/api";
import { Suspense, use, useState } from 'react';
import List from './list';


export default function Account(props:{
  promise: ReturnType<typeof getUsersInfo>
}) {

  const users = use(props.promise)
  const [promise] = useState(() => getUsersInfo(users.length))

  return (
    <div className='border border-blue-100 shadow rounded-md p-4 w-full mt-4'>
      <div className='flex space-x-4'>
        {users.map(user => (
          <div className='flex-1 overflow-hidden' key={user.id}>
            <div 
            className='rounded-md h-32 overflow-hidden bg-cover bg-no-repeat bg-center'
            style={{backgroundImage: `url(${user.url})`}}
            ></div>
            <div className='mt-4 font-bold'>{user.id}</div>
            <div className='mt-1 text-gray-400 text-sm'>{user.desc}</div>
          </div>
        ))}
      </div>

      <div className='mt-8 mb-4 font-bold text-sm'>Account users</div>
      <Suspense fallback={<Skeleton />}>
        <List promise={promise} />
      </Suspense>
    </div>
  )
}