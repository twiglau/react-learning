import React, { forwardRef, useImperativeHandle, useRef } from 'react'

const HYInput = forwardRef((props, ref)=>{
    const inputRef = useRef();
    // 限制 ref 可以使用的 动作
    // 动作由回调函数返回的对象中的属性决定
    useImperativeHandle(ref,()=> ({
        focus: ()=>{
            console.log('回调函数返回对象的focus');
            inputRef.current.focus();
        }
    }), [inputRef.current]);
    return <input ref={inputRef} type="text" />
})
export default function ImperativeHandleDemo() {
    const inputRef = useRef()
  return (
    <div>
        <HYInput ref={inputRef} />
       <button onClick={e => inputRef.current.focus()}>聚焦</button>
    </div>
  )
}
