import { useRef, forwardRef } from 'react'
import Input from '../Input'


export default function Demo01() {
    const input = useRef(null)

    return (
        <div className='flex justify-between'>
            <input ref={input} type='text' className='border p-2 rounded-md flex-1' />
            <button onClick={() => input.current.focus()}>点击获取焦点 01</button>
        </div>
    )
}

/**
 * 但是许多时候, 直接使用 input 标签并不能满足我们的需求, 我们需要基于 input 做额外的封装. 但是封装之后,
 * 我们还是希望能通过调用 .focus 让输入框获取焦点 
 * 
 * 1. const input = useRef(null)
 * 2. <Input ref={input} type='text' />
 * 3. input.current.focus()
 * 
 * 封装之后的区别在于, 我们使用封装之后的 Input, 就无法直接拿到内部的 input 对象了, 但是我们的目标
 * 依然是获取 input 对象, 然后调用 focus
 * 
 * 但是在模块的划分上, input 元素本身并不属于当前模块/组件, 因此, 调用input方法的行为, 其实是属于一种
 * 混乱. 除非我们不做解耦和封装 
 * 因此, 在React的组件封装中, 并不支持直接获取到 input 的引用, 而是以一种传入控制器的方式来调用它. 
 */

export function Demo02() {
    const input = useRef(null)
    return (
        <div className='flex justify-between'>
            <Input ref={input} type='text' className='flex-1'/>
            <button 
            onClick={() => input.current.focus()}
            className='ml-3'
            >点击获取焦点 02</button>
        </div>
    )

}

/**
 * forwardRef 基础知识
 * 1. 能够帮助 React 组件传递ref. 或者说是内部对象控制权的转移与转发. 
 * 2. 它接收一个组件作为参数
 * 3. 注意: 需要把 ref 放在自定义组件的参数中,而不是 props 的属性
 */

function MyInput01(props, ref) {
    console.log(props, ref)
    return <input ref={ref} />
}

const InputNumber = forwardRef(MyInput01)

export function Demo03() {
    const input = useRef(null)
    return (
        <div className='flex iustify-between'>
            <InputNumber  ref={input} />
            <button onClick={() => input.current.focus()}>点击获取焦点 03</button>
        </div>
    )
}

/**
 * React19
 * 1. forwardRef 直接背刺,由于 ref 传递机制的更改, 我们可以不用 forwardRef 也能做同样的事情了. 
 * 2. 首先,在声明组件时, ref 不再独立成为一个参数, 而是作为 props 属性中的一个属性. 
 */
function MyInput02(props) {
    return (
        <label>
            {props.label}
            <input ref={props.ref} />
        </label>
    )
}

export function Demo04() {
    const input = useRef(null)
    return (
        <div className='flex justify-between'>
            <MyInput02 ref={input} />
            <button onClick={() => input.current.focus()}>点击获取焦点 04</button>
        </div>
    )
}