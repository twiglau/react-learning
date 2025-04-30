import { useRef } from 'react'
import Button from '../Button'
import Post from './Post'


export default function Comment() {
    const post = useRef(null)

    function handleClick() {
        post.current.scrollAndFocusAddComment()
    }

    return (
        <>
          <Button onClick={handleClick}>Write a comment</Button>
          <Post ref={post} />
        </>
    )
}