import React, { useEffect, useState } from 'react'
import useScrollPosition from '../hooks/scroll-pos-hook';
export default function CustomContextScrollPos() {
  const positon = useScrollPosition();
  return (
    <div style={{padding:"1000px 0px"}}>
      <h2>CustomContextScrollPos</h2>
      <h2 style={{position:'fixed',left:0, top: 0}}>{positon}</h2>
    </div>
  )
}
