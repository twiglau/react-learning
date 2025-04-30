import { useRef, use} from 'react'
import Editor from './editor.jsx'
import { Context } from './context.jsx'

export default function Todo() {
    const editor = useRef(null)
    const { task } = use(Context)

    return (
        <div className='flex items-center border-t pt-4'>
            <div className='font-bold'>{task.task}</div>
            <div className='flex-1 mx-3 line-clamp-1'>{task.content}</div>
            <div className='text-green-300'>{task.status}</div>

            <button
            onClick={() => editor.current.show()}>eidt</button>
            <Editor ref={editor} title="Editor" />
        </div>
    )
}