import React, { useEffect, useState } from 'react'

export default function MultiEffectHookDemo() {
  const [count, setCount] = useState(0);
  const [isLogin, setLogin ] = useState(true);
  // 只有 count 改变时, 才会更新该DOM
  // 根据第二个参数, 对 useEffect 做出性能优化
  useEffect(() => {
    console.log('修改DOM')
    document.title = count
  }, [count])
  // 空数组,表示谁都不依赖,更新一次.
  useEffect(() => {
    console.log('订阅事件');
  }, [])
  useEffect(() => {
    console.log('网络请求');
  }, [])
  return (
    <div>
      <h2>EffectHookCancelDemo</h2>
      <h2>{count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
      <h2>{isLogin? '欢迎回来':'已退出'}</h2>
      <button onClick={e => setLogin(!isLogin)}>登录/登出</button>
    </div>
  )
}
