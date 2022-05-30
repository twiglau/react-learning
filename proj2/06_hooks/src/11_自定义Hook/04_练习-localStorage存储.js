import React, { useEffect, useState } from 'react'
import useLocalStorage from '../hooks/local-store-hook';
export default function CustomDateStore() {
  const [name, setName] = useLocalStorage('aaa');
  return (
    <div>
      <h2>CustomDateStore</h2>
      <h2>名字: {name}</h2>
      <button onClick={e => setName("why")}>设置 name</button>
    </div>
  )
}
