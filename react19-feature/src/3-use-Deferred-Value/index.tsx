import { useDeferredValue, useState } from "react";
import Expensive from "./expensive";


export default function Index() {
  const [counter,setCounter] = useState(0)

  function __clickHandler() {
    setCounter(counter + 1)
  }

  return (
    <div className='flex justify-between items-center'>
      <div>
        <div>counter: {counter}</div>
        <div className='mt-4'>counter: {counter}</div>
      </div>
      <button className='button' onClick={__clickHandler}>counter++</button>
    </div>
  )
}

/**
 * 第二个元素的更新，就不再与第一个元素同步。它更新的优先级被降低。 这个时候它的执行在理论上是
 * 可以被更高的优先级插队和中断的。
 * @returns 
 */
export function Index1() {
  const [counter,setCounter] = useState(0)
  const deferred = useDeferredValue(counter)

  function __clickHandler() {
    setCounter(counter + 1)
  }

  return (
    <div className='flex justify-between items-center'>
      <div>
        <div>counter: {counter}</div>
        <div className='mt-4'>counter: {deferred}</div>
      </div>
      <button className='button' onClick={__clickHandler}>counter++</button>
    </div>
  )
}

/**
 * 快速点击按钮，此时我们发现，两个按钮更新可以区分了。且快速点击时，第二个counter的更新，会落后于第一个。
 * 此时表示， 我们可以利用 useDeferredValue推迟 UI 的更新。 将对应任务的优先级降低，使其可以被插队与中断。
 * 
 * 此时，发现另外一种情况， 那就是 counter 直接对应的高优先级执行也没有那么流畅，这是？
 * 因为我们的模拟案例中， “并没有把耗时定位在渲染上”.  这就和实际的情况不一样了。
 * 我们把耗时写在了 Expensive 函数里， 而这个函数每次都会执行，它的执行阻塞了渲染。
 * @returns 
 */
export function Index2() {
  const [counter,setCounter] = useState(0)
  const deferred = useDeferredValue(counter, 0)

  function __clickHandler() {
    setCounter(counter+1)
  }

  return (
    <div className='flex justify-between items-center'>
      <div>
        <div>counter: {counter}</div>
        <Expensive counter={deferred} />
      </div>
      <button className='button' onClick={__clickHandler}>counter++</button>
    </div>
  )
}


/**
 * 这里我们一定要 区分开渲染任务和Expensive函数，它们是不同的。
 * UI渲染是一个异步任务， 而Expensive函数是同步执行的。
 * 
 * useDeferredValue 推迟的是 UI渲染任务。
 * 因此，需要特别注意， 不要在同步逻辑上执行过多的耗时任务。
 */

/**
 * 这里我们可以通过任务拆分的方式， 把执行耗时分散到更多的子组件中。
 * 这样 React 就可以利用任务中断的机制，在不阻塞渲染的情况下， 中断优先级的任务。
 */
