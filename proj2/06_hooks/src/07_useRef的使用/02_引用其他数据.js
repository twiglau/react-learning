import React, { useEffect, useRef, useState } from 'react'

export default function RefHookDemo2() {
  const [count, setCount] = useState(0);
  const numRef = useRef(count);
  // 界面渲染完成之后,再进行赋值
  // current值发生改变,但不会引起重新渲染
  useEffect(()=>{
    numRef.current = count;
    console.log('useEffect')
  },[count]);
  // 整个生命周期之间总是相同的
  return (
    <div>
      <h2>count上一次的值:{ numRef.current }</h2>
      <h2>count当前的值:  { count }</h2>
      <button onClick={e => setCount(count + 10)}>+10</button>
    </div>
  )
}
