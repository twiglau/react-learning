import { useRef } from "react";
import Myinput from "./myinput";



export default function Demo08() {
  const input = useRef<HTMLInputElement>(null)

  return (
    <div className="flex justify-between">
      <Myinput ref={input} label="请输入" />
      <button className="button ml-2" onClick={() => input.current?.focus()}>获取焦点</button>
    </div>
  )
}