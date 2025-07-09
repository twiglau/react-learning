import { useActionState } from "react";

async function increment(cur:number) {
  return cur + 1
}

export default function Test() {
  const [state, action] = useActionState(increment, 0)

  return (
    <form action={action} className='flex items-center'>
      <button className='button'>count++</button>
      <div className='ml-4'>{state}</div>
    </form>
  )
}