import Button from '@/components/button'
import Dialog, { DialogRef } from '@/components/dialog'
import Modal, { ModalRef } from '@/components/modal'
import { useRef } from "react"

export default function Demo10(){

  const modal = useRef<ModalRef>(null)
  function __click() {
    if(modal.current) {
      modal.current.show()
    }
  }

  return (
    <div className='flex justify-between'>
      <Button success onClick={__click} className='button ml-3'>点击弹窗展示</Button>
      <Modal ref={modal}>
        <div className='bg-white p-4 max-w-xl mt-48 mx-auto rounded'>
          这是一个弹窗
        </div>
      </Modal>
    </div>
  )
}

export function Demo11() {
  const dialog = useRef<DialogRef>(null)

  function __click() {
    if(dialog.current) {
      dialog.current.show()
    }
  }

  return (
    <div className='flex justify-between'>
      <Button signal  onClick={__click} className='button ml-3'>点击我，显示对话框</Button>
      <Dialog ref={dialog} title='Message For You'>
        <strong className='text-red-500'>React 19</strong>
        是全网学习体验最好的小册，没有之一。它能帮助你快速到 React 的独特的开发魅力。
        你将会感受到更快的学习速度。
        <div className='mt-4'>
          <img src='https://images.unsplash.com/photo-1485856407642-7f9ba0268b51?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='' />
        </div>
      </Dialog>
    </div>
  )
}