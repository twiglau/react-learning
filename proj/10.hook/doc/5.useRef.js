import React, { useState, useEffect, useRef,createRef,forwardRef,useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';


function Child(props, parentRef){
  let inputRef = useRef();
  let focusRef = useRef();
  useImperativeHandle(parentRef,()=>{
    return {
      focus(){
        focusRef.current.focus();
      },
      changeText(txt){
        inputRef.current.value = txt
      }
    }
  })
  return (
    <>
      <input ref={focusRef} />
      <input ref={inputRef} />
      {/* <button onClick={getFocus}>获得焦点</button> */}
    </>
  )
}
// 转发 ref, 函数组件并没有实例
let ForwardChild = forwardRef(Child);
// hook 有什么特点:
// 1. 可以用在函数组件中
// 2. 并且可以在函数组件的多次渲染之间保持不变
function Parent(){
  let [number, setNumber] = useState(0);
  const parentRef = useRef();
  function getFocus(){
    console.log('parentRef.current',parentRef.current)
    parentRef.current.focus();
    parentRef.current.changeText('测试改变文字');
  }
  return (
    <>
     <ForwardChild  ref={parentRef}/>
     <p>{number}</p>
     <button onClick={()=>setNumber(number+1)}>+</button>
     <button onClick={getFocus}>获取子组件焦点</button>
    </>
  )
}

ReactDOM.render(
  <Parent />,
  document.getElementById('root')
);

