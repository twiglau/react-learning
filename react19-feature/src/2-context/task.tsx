import { use, useRef } from "react";
import { Context } from "./context";
import Editor, { EditorRef } from "./editor";


export default function Demo12() {
  const editor = useRef<EditorRef>(null)
  const { task } = use(Context)

  return (
    <div className='flex items-center border-y border-gray-200 my-4 py-4'>
      <div className='font-bold'>{task.task}</div>
      <div className='flex-1 mx-3 line-clamp-1'>{task.content}</div>
      <div className='text-green-500'>{task.status}</div>

      <button
      onClick={() => editor.current?.show()}
      className='ml-3 button'
      >
        edit
      </button>
      <Editor ref={editor} title='Editor' />
    </div>
  )
}