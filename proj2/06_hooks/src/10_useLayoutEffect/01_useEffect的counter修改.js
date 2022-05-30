import React, { useEffect, useState } from 'react'

export default function EffectCounterDemo() {
    const [count, setCount] = useState(10);
    useEffect(()=>{
        // 这样做界面会有闪烁现象
        if(count == 20){
            setCount(Math.random())
        }
    }, [count]);
  return (
    <div>
      <h2>数字: {count}</h2>
      <button onClick={e => setCount(20)}>修改数字</button>
    </div>
  )
}
