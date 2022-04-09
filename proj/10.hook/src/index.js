import React, {  useEffect, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';

/**
 * 只要说一个方法, 前缀以 use 开头, 并且在函数内使用了 hooks, 那么它就是一个自定义的 hook
 * @returns 
 */
function useNumber(){
  const [number, setNumber] = useState(0);
  useEffect(()=>{
    setInterval(()=>{
      setNumber(number=>number+1)
    },1000)
  },[]);
  return [number, setNumber];
}
function Counter1(){
  const [number] = useNumber();
  return (
    <div>{number}</div>
  )
}
function Counter2(){
  const [number,setNumber] = useNumber();
  return (
    <>
    <p>{number}</p>
    <button onClick={()=>{
      setNumber(number + 1000);
    }}>{number}</button>
    </>
  )
}
ReactDOM.render(
  <>
  <Counter1 />
  <Counter2 />
  </>,
  document.getElementById('root')
);

