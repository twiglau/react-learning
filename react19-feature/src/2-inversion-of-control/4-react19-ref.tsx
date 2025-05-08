/**
 * React19中，ref机制更改，forwardRef 被无情抛弃
 * 
 * 在React19中，由于ref传递机制的更改，我们可以不用 forwardRef 也能做到同样的事情了恶
 * 
 * 注意：
 * 1. 在声明组件时，ref 不再独立成为一个参数，而是作为 props 属性中的一个属性。
 * 2. 代码这样写之后，就可以直接在父组件中，通过 ref 拿到 input 的控制权
 */

import { useRef } from "react";

export default function Demo09() {
  const input = useRef<HTMLInputElement>(null)
  return (
    <div className='flex justify-between'>
      <input ref={input} className='border p-2 rounded-md flex-1' />
      <button
      onClick={() => input.current?.focus()}
      className='ml-3'
      >
        获取焦点
      </button>
    </div>
  )
}