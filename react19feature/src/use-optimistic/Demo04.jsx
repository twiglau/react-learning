import { useOptimistic, useState, useTransition } from 'react'
import { likeApi } from '../api.js'
import { reducer2 } from './reducer.js'
import s from './index.module.css'


export default function Index() {
    const [like, setLike] = useState(false)
    const [optimisticLike, dispatch] = useOptimistic(like, reducer2)
    const [isPending, startTransition] = useTransition()
    const [end, setEnd] = useState()

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


    let __cls = optimisticLike ? `${s.cen} ${s.active}` : s.cen

    return (
      <div>
        <div className={s.star} onClick={__clickHandler}>
          <div id={s.lef} className={__cls}></div>
          <div id={s.c} className={__cls}></div>
          <div id={s.rig} className={__cls}></div>
        </div>
        <div className={s.loading}>
          状态:
          {isPending && 'requesting...'}
          {!isPending && end === true && 'success'}
          {!isPending && end === false && 'failture'}
        </div>
      </div>
    )

}