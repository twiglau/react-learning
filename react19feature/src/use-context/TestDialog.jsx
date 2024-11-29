import { useRef } from 'react'
import Dialog from './Dialog'

export default function Test() {
    const dialog = useRef(null)
    return (
        <div className='flex justify-between'>
            <button onClick={() => dialog.current.show()}>点击我, 显示</button>
            <Dialog ref={dialog} title='Message For You' onSure={() => dialog.current.close()}>
                <strong className='text-red-500'>React19</strong>测试一下
                <div className='mt-4'>
                    <img src='https://images.unsplash.com/photo-1485856407642-7f9ba0268b51?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='' />
                </div>
            </Dialog>
        </div>
    )
}