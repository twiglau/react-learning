import { useDeferredValue, useState } from "react";
import Costly from "./costly";

export default function Index3() {

  const [counter, setCounter] = useState(0)
  const deferred = useDeferredValue(counter)

  function __clickHandler() {
    setCounter(counter + 1)
  }

  return (
    <div className='flex justify-between items-center'>
      <div>
        <div>counter: {counter}</div>
        <Costly counter={deferred} />
      </div>
      <button className='button' onClick={__clickHandler}>counter++</button>
    </div>
  )
}