import Dialog, { DialogRef } from "@/components/dialog";
import Input from "@/components/input";
import { uuid } from "@/utils";
import { RefObject } from "react";




export default function Modal(props: {
  ref: RefObject<DialogRef>,
  onChange: (item: any) => any
}) {
  const { ref, onChange } = props

  function action(f: FormData) {
    const item = {
      id: uuid(),
      name: f.get('name'),
      desc: f.get('desc'),
      hours: f.get('hours'),
      rate: f.get('rate'),
      price: f.get('price')
    }

    ref.current.close()
    if(onChange) {
      onChange(item)
    }
  }


  return (
    <Dialog title='Editor' ref={ref} footer>
      <form action={action}>
        <Input label="Name" name="name" placeholder='Please input your project name.' />
        <Input label="Desc" name="desc" placeholder='Please input your project description' />
        <Input label="Hours" name="hours" type='number' placeholder='Please input hours.' />
        <Input label="Rate" name="rate" type='number' placeholder='please input rate.' />
        <div className='flex justify-end'>
          <button className='button' type='submit'>Submit</button>
        </div>
      </form>
    </Dialog>
  )

}