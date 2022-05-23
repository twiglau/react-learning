import React, { useState } from 'react'

export default function MultiHookState() {
  
   const [count, setCount ] = useState(0);
   const [age, setAge ] = useState(18);
   const [movies, setMovies] = useState(["明日之后","黎明之前"])
  return (
    <div>
      <h2>当前计数: {count}</h2>
      <h2>我的年龄: {age}</h2>
      {
          movies.map(ele => <h2 key={ele}>{ele}</h2>)
      }
    </div>
  )
}
