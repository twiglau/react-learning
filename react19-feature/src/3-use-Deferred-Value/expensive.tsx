const Expensive = ({counter}:{counter:number}) => {

  const start = performance.now()
  while(performance.now() - start < 200) {
    //模拟耗时任务
  }
  return (
    <div className='mt-4'>Deferred: {counter}</div>
  )

}

export default Expensive