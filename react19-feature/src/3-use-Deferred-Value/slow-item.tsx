
function SlowItem({counter}:{counter:number}) {
  const startTime = performance.now()

  while(performance.now() - startTime < 1) {
    // 1ms delay
  }

  return (
    <li>{counter}</li>
  )
}

export default SlowItem