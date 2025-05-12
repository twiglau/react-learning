import { HTMLAttributes, RefObject, useImperativeHandle, useRef } from "react";

export interface CommentListRef {
  scrollToBottom: () => unknown
}

export interface CommentListProps<T> extends HTMLAttributes<T> {
  ref: RefObject<CommentListRef | null>
}
export default function CommentList({ ref }: CommentListProps<HTMLDivElement>) {

  const divRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => {
    return {
      scrollToBottom() {
          const node = divRef.current;
          if(node) {
            node.scrollTo({
              top: node.scrollHeight,
              behavior: 'smooth'
            })
          }
      },
    }
  }, [])

  const comments = [];
  for(let i=0; i < 50; i++) {
    comments.push(<p key={i}>Comment #{i}</p>);
  }

  return (
    <div className='border p-4 rounded h-32 overflow-auto' ref={divRef}>
      {comments}
    </div>
  )
}