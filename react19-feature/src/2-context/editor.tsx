import Dialog, { DialogProps, DialogRef, } from "@/components/dialog";
import React, { use } from "react";
import { Context } from "./context";

export type EditorRef = DialogRef

export default function Editor(props: DialogProps) {
  const { ref, ...other } = props
  const { task, updateTask } = use(Context)

  function __inputchange(e: React.ChangeEvent<HTMLInputElement>) {
    updateTask({
      ...task,
      content: e.target.value
    })
  }
  function __close() {
    if(ref.current) {
      ref.current.close()
    }
  }

  return (
    <Dialog ref={ref} {...other} onSure={__close}>
      <div className='flex items-center'>
        <div className='w-20'>name</div>
        <div className='flex-1 p-2 text-sm font-bold'>{task.task}</div>
      </div>

      <div className='flex items-center mt-4'>
        <div className='w-20'>content</div>
        <input 
        value={task.content}
        className='flex-1 border rounded-md p-2 text-sm' 
        onChange={ e => __inputchange(e)}
        />
      </div>

      <div className='flex items-center mt-4'>
        <div className='w-20'>status</div>
        <div className='flex-1 p-2 text-sm text-green-300'>{task.status}</div>
      </div>

      <div className='flex items-center mt-4'>
        <div className='w-20'>Priority</div>
        <div className='flex-1 p-2 text-sm text-red-300'>{task.priority}</div>
      </div>
    </Dialog>
  )
}