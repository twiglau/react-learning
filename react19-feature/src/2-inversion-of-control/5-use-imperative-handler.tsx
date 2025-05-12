/**
 * useImperativeHandler
 * 自定义控制器能执行哪些方法。
 * 
 * 1. ref参数： 组件声明时传入的 Ref.
 * 2. createHandle: 回调函数，需要返回 ref 引用的对象，我们也是这里重新 ref 引用。
 * 3. deps: 依赖项数组，可选。state, props 以及内部定义的其他变量都可以作为依赖项，React 内部会使用 Object.js 来对比
 * 依赖项是否发生了变化。依赖项发生变化时， createHandle 会重新执行， ref 引用会更新。
 * 如果不传入依赖项，那么每次更新 createHandle 都会重新执行。
 */

import { useRef } from "react"
import Post, { PostRef } from "./post"


export default function Demo09() {

  const postRef = useRef<PostRef>(null)

  function handleClick() {
    if(postRef) {
      postRef.current?.scrollAndFocusAddComment()
    }
  }

  return (
    <>
      <button className='button' onClick={handleClick}>Write a comment</button>
      <Post ref={postRef} />
    </>
  )
}