import { uuid } from "@/utils";
import { getInputMessage } from "@/utils/api";
import { useOptimistic, useRef, useState, useTransition } from "react";
import Message from './message';
import { Message as MessageType, reducer } from "./reducer";


export default function Optmistic() {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(messages, reducer)

  const form = useRef<any>(null)

  async function formAction(formData:FormData) {
    const newMessage = formData.get('message') as string
    addOptimisticMessage({
      value: newMessage,
      id: uuid()
    });

    form.current.reset();
    const msg = await getInputMessage(newMessage);
    setMessages([...messages, msg])
  }

  return (
    <>
      <form action={formAction} ref={form} className='flex'>
        <input
        type="text"
        name="message"
        placeholder="enter your message"
        />
        <button type='submit' className='button ml-2'>Send</button>
      </form>

      {optimisticMessages.map((message) => (
        <div
        key={message.id}
        className='indent-1 text-slate-600 mt-1 hover:bg-slate-800 p-2 cursor-pointer rounded'
        >
          {message.value} {!!message.sending && <small>(Sending...)</small>}
        </div>
      ))}
    </>
  )
}

/**
 * 会有多条内容同时正在 Sending, 但是最终请求成功之后，
 * 这些同时的 Sending 内容仅有一条信息被合并到最终结果中。
 * 其他内容会消失。
 */
export function Optmistic2() {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(messages, reducer)
  const [isPending, startTransition] = useTransition()

  const form = useRef<any>(null)

  async function formAction(formData:FormData) {
    const newMessage = formData.get('message') as string
    form.current.reset();

    startTransition(async () => {
      addOptimisticMessage({ value: newMessage, id: uuid() });
      const msg = await getInputMessage(newMessage);
      setMessages([...messages, msg])
    })
  }

  return (
    <>
      <form action={formAction} ref={form} className='flex'>
        <input type="text" disabled={isPending} name="message" placeholder="enter your message"/>
        <button type='submit' disabled={isPending} className='button ml-2'>{isPending ? 'sending...' : 'Send'}</button>
      </form>

      {optimisticMessages.map((message) => (
        <div
        key={message.id}
        className='indent-1 text-slate-600 mt-1 hover:bg-slate-800 p-2 cursor-pointer rounded'
        >
          {message.value} {!!message.sending && <small>(Sending...)</small>}
        </div>
      ))}
    </>
  )
}

/**
 * 如果我要连续快速输入，内容。
 * 又不想多个 Sending 中的信息被合并。
 * 同时，又不想使用一些方式限制用户的输入，该怎么处理？
 * 
 * 不希望多个同时处于发送状态中的信息被回退重置。
 * 因此，我们把状态拆分开，每一条信息各自维护自己的状态。
 * 
 * 通常情况下，我们会把需求进一步调整成为 请求失败也不回退，而是给出重试按钮 或者 异常状态。
 * 这种情况下，就和乐观更新的需求产生了一点微妙的差异。
 */

export interface Payload {
  value: string,
  id: string
}
export function Optmistic3() {
  const [payloads, setPayloads] = useState<Payload[]>([])
  const form = useRef<any>(null)

  async function formAction(formData:FormData) {
    const newMessage = formData.get('message') as string
    setPayloads([...payloads, { value: newMessage, id: uuid() }])
    form.current.reset();
  }

  return (
    <>
      <form action={formAction} ref={form} className='flex'>
        <input type="text" name="message" placeholder="enter your message"/>
        <button type='submit' className='button ml-2'>Send</button>
      </form>

      {payloads.map(payload => (
        <Message key={payload.id} message={payload.value} />
      ))}
    </>
  )
}