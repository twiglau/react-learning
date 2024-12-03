import { useOptimistic, useState, useRef } from 'react'
import { getMessage2 } from '../api'
import { reducer } from './reducer.js'

/**
 * 
 * 1. 首先明确一点, 消息发送是一个异步过程, 因此我们把这个过程使用 Sending... 字符来表示. 
 * 当每条消息的Sending... 消失, 才表示数据更新成功 
 * 2. 然后需要一个列表来渲染输出之后的结果. 根据我们之前的结果, 该列表
 * 需要用 useOptimistic 返回的临时状态来处理, 这样我们才能够第一时间
 * 在UI上看到反馈结果
 * 
 * 3. 状态如何设计
 * 3.1 首先需要使用 useState 来设计一个状态, 用于存储真实的状态结果
 * 3.2 然后需要使用 useOptimistic 来设计临时状态, 这里
 * 需要注意的是, 我们可以把它当成一个 reducer 来看待, 第一个参数表示当前状态, 第
 * 二个参数表示一个合并方式
 * 3.2.1 临时状态包含一个 sending: true, 用于标识当前请求正在发生. 
 * 3.2.2 在formAction回调函数中, 我们会调用 addOptimisticMessage 立即更新临时状态,
 * 并发送请求, 我们提前把发送请求的接口写好
 * 
 * 
 * 4. 问题
 * 快速连续输入内容并 Send, 会发现, 最终的效果并非我们所愿, 此时会有多条内容同时正在 Sending,
 * 但是最终请求成功之后, 这些同时的 Sending 内容仅有一条信息被合并到最终结果中,其他内容会消失. 
 * 
 * 那么如何解决该问题?
 */

export default function Index() {
    const [ messages, setMessages ] = useState([])
    const [optimisticMessages, addOptimisticMessage] = useOptimistic(messages, reducer);

    const form = useRef(null);

    async function formAction(formData) {
        let newMessage = formData.get("message")
        // 临时状态
        addOptimisticMessage(newMessage)
        form.current.reset()
        // 最终状态
        let message = await getMessage2(newMessage)
        setMessages([...messages, { text: message }])
    }

    return (
        <>
          <form action={formAction} ref={form} className='flex'>
            <input type='text' name='message' placeholder='enter your message' />
            <button type='submit' className='ml-2'>Send</button>
          </form>

          {optimisticMessages.map((message,index) => (
            <div key={index} className='indent-l text-slate-600 mt-l hover:bg-slate-100 p-2 cursor-pointer rounded'>
                {message.text} {!!message.sending && <small>(Sending...)</small>}
            </div>
          ))}
        </>
    )

}