import React, { memo, useMemo, useState } from 'react'

const HYInfo = memo((props)=>{
    console.log('HYInfo 重新渲染')
    return <h2>名字: {props.info.name} 年龄: {props.info.age}</h2>
})
export default function MemoHookDemo2() {
    console.log('Demo2 重新渲染')
    const [show, setShow] = useState(true);

    // 1. 临时变量, Demo2 重新渲染时, 浅层比较, 都会认为是新的值, 子组件HYInfo会重新渲染
    // const info = {name: 'lau', age: 20}
    // 2. 使用 useState, 只要值没有改变, 进行浅层比较时, 会认为是同一个值, 子组件不会重新渲染
    // const [info, setInfo] = useState({name:'lau',age:20})
    // 3. 使用 useMemo
    const info = useMemo(()=>{
        return {name: 'code', age: 18}
    },[]);

  return (
    <div>
      <HYInfo info={info} />
      <button onClick={e => setShow(!show)}>show切换</button>
    </div>
  )
}
