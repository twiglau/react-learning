import React, {  useEffect, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function UseLayoutEffectComp(){
  const [color, setColor] = useState('red');
  useEffect(()=>{
    console.log('useEffect color=',color);
  });
  useLayoutEffect(()=>{
    console.log('useLayoutEffect color=',color);
    // alert('useLayoutEffect color=' + color);
    // 如果想要提前拿到 dom, 操作, 尽量在 useLayout 里面
    // 如果在 useEffect 里面操作, 会有闪烁. 
    document.getElementById('myDiv').style.backgroundColor = 'purple';
  })
  return (
    <>
     <div id="myDiv" style={{backgroundColor:color}}>颜色</div>
     <button onClick={()=>setColor('red')}>红</button>
     <button onClick={()=>setColor('yellow')}>黄</button>
     <button onClick={()=>setColor('blue')}>蓝</button>
    </>
  )
}

ReactDOM.render(
  <UseLayoutEffectComp />,
  document.getElementById('root')
);

