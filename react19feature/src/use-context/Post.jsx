import { useImperativeHandle, useRef } from 'react'
import Input from '../Input'

/**
 * 1. 除了直接拿到元素对象本身就已经存在的 ref
 * 2. 还可以通过 useImperativeHandle 来自定义 ref 控制器能执行哪些方法
 * 3. useImperativeHandle 接收三个参数:
 * 3.1 ref - 组件声明时传入的 ref
 * 3.2 createHandle: 回调函数, 需要返回 ref 引用的对象, 这个也是重写 ref 引用
 * 3.3 deps: 依赖项数组. 
 * 
 */

const CommentList = ({ref}) => {
    const divRef = useRef(null)

    useImperativeHandle(ref, () => {
        return {
            scrollToBottom() {
                const node = divRef.current;
                node.scrollTop = node.scrollHeight
            }
        }
    }, [])

    let comments = [];
    for(let i = 0; i < 20; i++) {
        comments.push(<p key={i}>Comment #{i}</p>)
    }

    return (
        <div className='border p-4 rounded h-32 overflow-y-auto' ref={divRef}>
            {comments}
        </div>
    )
}

const AddComment = (props) => {
    return (
        <Input placeholder="Add Comment..." ref={props.ref} className="mt-4" />
    )
}


export default function Post({ ref }) {
    const commentsRef = useRef(null);
    const addCommentRef = useRef(null);

    useImperativeHandle(ref, () =>{
        return {
            scrollAndFocusAddComment() {
                commentsRef.current.scrollToBottom();
                addCommentRef.current.focus();
            }
        }
    }, [])

    return (
        <>
          <article>
            <p>Welcome to my Blog!</p>
          </article>
          <CommentList ref={commentsRef} />
          <AddComment ref={addCommentRef} />
        </>
    )
}