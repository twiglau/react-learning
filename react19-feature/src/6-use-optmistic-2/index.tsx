
import { useOptimistic, useState, useTransition } from "react";
import { likeApi } from "./api";
import m from "./index.module.css";
import { reducer } from "./reducer";


export default function Optmistic3() {
  const [like, setLike] = useState(false)
  const [optimisticLike, dispatch] = useOptimistic(like, reducer);
  const [isPending, startTransition] = useTransition()
  const [end, setEnd] = useState<boolean>()

  function __clickHandler() {
    if(isPending) return
    let newState = !like

    startTransition(async () => {
       dispatch(newState)
       try {
        let state = await likeApi(newState)
        setLike(state)
        setEnd(true)
       } catch (error) {
        setEnd(false)
       }
    })
  }


  let __cls = optimisticLike ? `${m.cen} ${m.active}` : m.cen

  return (
    <div>
      <div className={m.star} onClick={__clickHandler}>
        <div id={m.lef} className={__cls}></div>
        <div id={m.c} className={__cls}></div>
        <div id={m.rig} className={__cls}></div>
      </div>
      <div className={m.loading}>
        状态：
        {isPending && '请求中...'}
        {!isPending && end === true && '请求成功'}
        {!isPending && end === false && '请求失败'}
      </div>
    </div>
  )
}