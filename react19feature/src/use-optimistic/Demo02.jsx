import { useOptimistic, useState, useRef, useTransition } from 'react'
import { getMessage2 } from '../api.js'
import { reducer } from './reducer.js'

/**
 * 在上个案例中, 当我们快速发送多条信息时, 我们发现, 并不是每一条消息都被成功合并
 * 到真实状态了. 最终结果是有的消息不见了. 如何解决这个问题?
 * 
 * 可以结合 useTransition 来防止用户连续触发 formAction 执行
 */

export default function Index() {
    const [ messages, setMessages ] = useState([])
    const [optimisticMessages, addOptimisticMessage] = useOptimistic(messages, reducer);
    const [isPending, startTransition] = useTransition()

    const form = useRef(null);

    async function formAction(formData) {
        let newMessage = formData.get("message")
        
        form.current.reset()
        startTransition(async () => {
            // 临时状态
            addOptimisticMessage(newMessage)
            // 最终状态
            let message = await getMessage2(newMessage)
            setMessages([...messages, { text: message }])
        })
    }

    return (
        <>
          <form action={formAction} ref={form} className='flex'>
            <input type='text' name='message' placeholder='enter your message' disabled={isPending} />
            <button type='submit' className='ml-2' disabled={isPending}>Send</button>
          </form>

          {optimisticMessages.map((message,index) => (
            <div key={index} className='indent-l text-slate-600 mt-l hover:bg-slate-100 p-2 cursor-pointer rounded'>
                {message.text} {!!message.sending && <small>(Sending...)</small>}
            </div>
          ))}
        </>
    )

}