import { useState, useDeferredValue, memo } from 'react'

/**
 * 
 * Demo01: 注意: 状态 counter 被两个元素使用, 因此, 这两个元素的更改, 实际上是 一个任务. 
 * 他们必定会同时响应 counter 的变化. 
 * 
 * Demo02: 利用 useDeferredValue, 把他们拆分成两个任务. 
 * 
 * 此时, 第二个元素的更新, 就不再与第一个元素同步. 它更新的优先级被降低. 
 * 这个时候它的执行在理论上是可以被更高的优先级插队和中断的. 
 * 
 * 但是由于渲染都太短, 肉眼是无法区分出来两个任务已经被分开了. 
 * 
 * Demo03: 为了看出区别, 把第二个元素重构成一个子组件,并模拟成一个耗时组件
 * 
 * 快速点击按钮, 此时我们发现, 两个按钮的更新可以区分开了. 并且在快速点击时, 第二个 counter 的更新,会落后于第一个 counter.
 * 此时表示, 我们可以利用 useDeferredValue 推迟 UI 的更新. 将对应的优先级降低, 使其可以被插队与中断. 
 * 
 * 此时会发现另外一个情况, 那就是 counter 直接对应的 高优先级执行 也没有那么顺畅, 这是为什么呢?
 * 因为在该模拟案例中, 并没有吧耗时定位的渲染上. 这就和实际的情况不太一样了. 我们吧耗时写在了 Expensive 函数里,而这个函数每次都会执行,
 * 它的执行阻塞了渲染. 所以我们会觉得第一个 counter 的更新变得比较卡顿. 
 * 
 * 这里一定要区分开渲染任务和Expensive函数, 他们是不同的, UI渲染是一个异步任务, 而Expensive函数同步执行的. useDeferredValue推迟的
 * 是 UI渲染任务, 因此,我们需要特别注意: 不要在不同逻辑上执行过多的耗时任务. 
 * 
 * Demo04: 这里我们可以通过任务拆分的方式, 把执行耗时时间分散到更多的子组件中区, 这样 React 就可以利用任务中断机制,在不阻塞渲染情况下,
 * 中断低优先级的任务. 
 * 
 * 注意如果你没有使用 React Compiler, 需要使用 memo 手动缓存 Expensive.
 * 当更新发生时, useDeferredValue 会首先使用旧值传递给组件. 
 * 
 * 因此, 当 counter 发生变化时, deferred 依然是旧值, 那么此时, 如果我们使用 memo 包裹, Expensive 的 props 就没有发生变化, 我们可以
 * 跳过此次针对 Expensive 的更新. 所以我们快速点击时, Expensive 总是接受到旧值, 它本身的渲染也会被中断. 
 * 
 * - 这跟React的性能优化策略有关. 
 */
export default function Index() {
    const [ counter, setCounter ] = useState(0)
    const deferred = useDeferredValue(counter)

    function __clickHandler() {
        setCounter(counter + 1)
    }

    return (
        <div className='flex justify-between items-center'>
            <div>
                <div>counter: {counter}</div>
                {/* <div className='mt-4'>deferred counter: {deferred}</div> */}
                <MemoExpensive counter={deferred} />
            </div>
            <button onClick={__clickHandler}>counter++</button>
        </div>
    )
}

const Expensive = ({counter}) => {
    // const start = performance.now()
    // while(performance.now() - start < 200) {console.log('耗时任务')}
    let items = []
    for(let i = 0; i < 200; i++) {
        items.push(<SlowItem key={i} counter={counter} />)
    }
    return (
        <div className='mt-4 text-green-500'>
            <div>Deferred: {counter}</div>
            <ul className='h-32 hidden'>{ items }</ul>
        </div>
    )
}
const MemoExpensive = memo(Expensive)

function SlowItem({counter}) {
    let startTime = performance.now();
    while(performance.now() - startTime < 1) {
        // Do nothing for 1 ms per item to emulate extremely slow code
    }
    return (
        <li>{ counter }</li>
    )
}