import { useRef } from "react";
import Input from "./input";


export default function Demo07() {
  const input = useRef<HTMLInputElement>(null)
  

  return (
    <div className="flex justify-between">
      <Input ref={input} type='text' className="flex-1" />
      <button
      onClick={() => input.current?.focus()}
      className='button ml-3'
      >
        点击获取焦点
      </button>
    </div>
  )
}