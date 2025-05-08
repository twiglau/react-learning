
/**
 * IOC(Inversion of Control) 控制反转是一个非常高级的概念。
 * 
 * - 它是一种设计设计理念，在减少对象之间的耦合关系上有非常重要的作用。
 */

import { useRef } from 'react'

export default function Demo06() {
  const input = useRef<HTMLInputElement>(null)

  return (
    <div className='flex justify-between'>
      <input ref={input} type='text' className='border p-2 rounded flex-1' />
      <button
      onClick={() => input.current?.focus()}
      >点击获取焦点</button>
    </div>
  )
}

/**
 * 1. 但是许多时候，直接使用 input 标签并不能满足我们的需求， 我们需要基于 input 做额外的封装。
 * 但是封装之后， 我们还是希望能通过调用 .focus 让输入框获取焦点。
 * 
 * - 封装之后的区别就在于，我们使用封装之后的Input, 就无法直接拿到内部的 input 对象了，但是我们
 * 的目标依然是获取input对象，然后调用 focus
 * 
 * - 但是在模块的划分上，input元素本身并不属于当前模块/组件，因此，调用input方法的行为，其实是属于
 * 一种混乱。   
 */

/**
 * 2. 因此，在React的组件封装中，并不支持直接获取到 input 的引用，而是以传入控制器的方式来调用它。
 * 在这个场景里：
 * > 1. input 对象本身是 被调用者
 * > 2. input 组件是 容器
 * > 3. ref 是控制器
 * 
 * 当前组件利用 ref 来调用 input. 从而让代码的解耦变得非常合理。 可扩展性也很强。
 */

