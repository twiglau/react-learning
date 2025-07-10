import { getInputMessage } from "@/utils/api"
import { Suspense, use, useState } from "react"



export default function Message({message}: {
  message: string
}) {
  const [promise] = useState(() => getInputMessage(message))

  return (
    <div className='indent-1 text-slate-600 mt-1 p-2 cursor-pointer rounded'>
      <Suspense fallback={<>{message}<small>(Sending...)</small></>}>
        <MessageInner promise={promise} />
      </Suspense>
    </div>
  )
}

function MessageInner({promise}:{
  promise: ReturnType<typeof getInputMessage>
}) {
  const message = use(promise)

  return message.value
}