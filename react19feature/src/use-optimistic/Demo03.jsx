import { useOptimistic, useState, useRef, useTransition } from 'react'
import { getMessage2 } from '../api.js'
import { reducer } from './reducer.js'

/**
 * Demo解决问题:
 * 如果连续快速输入, 内容, 又不想多个 Sending 中的信息被合并, 同时,
 * 又不想使用一些方式限制用户的输入,该怎么做?
 * 
 * 也就是 不希望多个同时处于发送状态中的信息被回退重置.
 * 因此, 我们要把状态拆分开, 每一条信息各自维护自己的状态. 
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