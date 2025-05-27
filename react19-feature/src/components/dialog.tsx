import Button from "@/components/button"
import Modal, { ModalRef } from "@/components/modal"
import clsx from "clsx"
import { ReactNode, RefObject, useEffect, useImperativeHandle, useRef, useState } from "react"
import C from './dialog.module.css'

type Position = { x: number, y: number } | null
let mousePosition: Position = null

const getClickPosition = (e: MouseEvent) => {
  mousePosition = {
    x: e.pageX,
    y: e.pageY
  }
  

  setTimeout(() => {
    mousePosition = null
  }, 100)
}

document.addEventListener('click', getClickPosition, true)


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setTransformOrigin(node: any, value: string) {
   const style = node.style;
   ['Webkit','Moz', 'Ms', 'ms'].forEach(function (prefix) {
    style[prefix + 'TransformOrigin'] = value;
   });
   style['transformOrigin'] = value;

   console.log('style:', style)
}

function offset(el: HTMLDivElement) {
  const rect = el.getBoundingClientRect()
  const pos = {
    left: rect.left,
    top: rect.top
  }

  const doc = el.ownerDocument
  const w = doc.defaultView
  pos.left += getScroll(w)
  pos.top += getScroll(w, 1)

  return pos
}

// 1st use window.pageXOffset and window.pageYOffset
// 2nd use window.document.documentElement.scrollLeft/scrollTop
// 3rd use window.document.body.scrollLeft/scrollTop
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getScroll(w: any, top?:number) {
  let ret = w['page' + (top ? 'Y':'X') + 'Offset'];
  const method = 'scroll' + (top? 'Top':'Left');

  if(typeof ret !== 'number') {
    const d = w.document;
    ret = d.documentElement[method];
    if(typeof ret !== 'number') {
      ret = d.body[method];
    }
  }

  return ret
}


export type DialogRef = {
  show: () => unknown,
  close: () => unknown
}

export interface DialogProps {
  onClose?:() => unknown,
  ref: RefObject<DialogRef | null>,
  children?:ReactNode,
  title: string,
  onSure?: () => unknown,
  footer?: ReactNode
}

export default function Dialog(props: DialogProps) {
  const { onClose, ref, title, children, footer, onSure } = props

  const [show,setShow] = useState(false)
  const [display,setDisplay] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const modal = useRef<ModalRef>(null)

  useImperativeHandle(ref, () => {
    return {
      show() {
        modal.current?.show()
        document.body.style.overflow = 'hidden'
        setShow(true)
        setDisplay(true)
      },
      close,
    }
  }, [])

  function close() {
    
    setShow(false)
    modal.current?.close()
    document.body.style.overflow = 'visible'
  }
  function closeHandler() {
    close()
    if(onClose) {
      onClose()
    }
  }

  function clickHandler(e: React.MouseEvent) {
    e.stopPropagation()
  }
  function sureClickHandler(e: React.MouseEvent) {
    e.stopPropagation()
    if(onSure) {
      onSure()
    }
  }

  console.log('这里的dialog:', display)

  function animationendHandler() {
    console.log('animationendHandler', display)
    if(!show) {
      setDisplay(false)
    }
  }

  const cls = clsx(C['dialog-wrapper'], {
    [C.in]: show,
    [C.out]: !show
  })

  useEffect(() => {
    const node = wrapperRef.current
    if(display && node) {

      const elOffset = offset(node)
      if(mousePosition) {
        setTransformOrigin(node, mousePosition.x - elOffset.left + 'px '+ (mousePosition.y - elOffset.top) + 'px')
      }
    }
  }, [display])

  return (
    <Modal ref={modal} onClose={closeHandler}>
      {display  ? (
        <div
        ref={wrapperRef}
        className={cls}
        onClick={clickHandler}
        onAnimationEnd={animationendHandler}
        >
          <header>
            <div className='flex justify-between items-center mb-2'>
              <div className='font-bold text-lg leading-6'>
                {title}
              </div>
              <div onClick={closeHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </header>
          <section className='leading-6'>
            { children }
          </section>
          { footer || (
            <footer className='text-end mt-4'>
              <Button primary onClick={sureClickHandler}>确认</Button>
            </footer>
          )}
        </div>
      ):null}
    </Modal>
  )
}