import clsx from "clsx";
import { ReactNode, RefObject, useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";
import C from './modal.module.css';

export type ModalRef = {
  show: () => unknown
  close: () => unknown
}

export interface ModalProps {
  onClose?:() => void
  children: ReactNode
  ref: RefObject<ModalRef | null>
}

export default function Modal(props: ModalProps) {
  
  const { onClose, children, ref } = props
  // 控制动画的执行
  const [show, setShow] = useState(false)
  // 控制节点的增删
  const [display, setDisplay] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      show: () => {
        setShow(true);
        document.body.style.overflow = 'hidden'
        setDisplay(true)
      },
      close: () => {
        document.body.style.overflow = 'visible'
        setShow(false)
      }
    }
  }, [])

  const cls = clsx(C.modal, {
    [C.in]: show,
    [C.out]: !show
  })

  function __animationendHandler() {
    if(!show) setDisplay(false)
  }

  function __closeHandler() {
    setShow(false)
    if(onClose) {
      onClose()
    }
  }

  if(!display) { return null }


  return (
    <>
    {
      createPortal(
        <div
        className={cls}
        onAnimationEnd={__animationendHandler}
        onClick={__closeHandler}
        >
          { children}
        </div>,
        document.body
      )
    }
    </>
  )
}