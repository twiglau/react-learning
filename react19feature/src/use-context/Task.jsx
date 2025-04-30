import { useRef } from 'react'
import Modal from './Modal'

export default function Task() {
    const modal = useRef(null)
    return (
        <div className='flex justify-between'>
            <button onClick={() => modal.current.show()}>点击显示弹窗</button>
            <Modal ref={modal}>
                <div className='bg-white p-4 ma-w-xl mt-48 mx-auto rounded'>这个小弹窗</div>
            </Modal>
        </div>

    )
}