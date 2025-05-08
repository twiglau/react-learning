import { forwardRef, Ref } from "react";


function MyInput(props:{label:string}, ref:Ref<HTMLInputElement>) {
  return (
    <label>
      {props.label}
      <input ref={ref} />
    </label>
  )
}

export default forwardRef(MyInput)