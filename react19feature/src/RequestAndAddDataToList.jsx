import { Suspense, useEffect, useState, use } from "react"
import Skeleton from "./Skeletion"
import Userinfo from "./Userinfo"
import { getMessage } from "./api"
import Button from "./Button"
/**
 * 1. 旧的思路在实现上非常巧妙, 但是简洁度依然弱于新的实现方案. 
 * 2. 旧的实现还有许多问题需要处理,例如初始化请求了两次, 我们要考虑接口防重的问题. 
 * 3. 以及当我们多次连续点击按钮时, 会出现竞态问题而导致渲染结果出现混乱. 
 */
const Demo01 = () => {
    const [list, updateList] = useState([])
    useEffect(() => {
        updateList([...list, { type: 'loading' }])
        getMessage().then(res => {
            updateList([...list, res])
        })
    }, [])

    function __handler() {
        updateList([...list, { type: 'loading' }])
        getMessage().then(res => {
            updateList([...list, res])
        })
    }

    return (
        <>
          <div className="text-right mb-4">
            <Button onClick={__handler}>新增数据</Button>
          </div>
          <List list={list} />
        </>
    )

}

function List(props) {
    const list = props.list
    return (
        <>
          {
            list.map((item,index) => {
                if(item.type === 'loading') {
                    return <Skeleton key={index} />
                }
                return <Userinfo index={index} username={item.id} message={item.value} key={index} />
            })
          }
        </>
    )
}


const Demo02 = () => {
    const [promise, updatePromise] = useState(() => [getMessage()])

    function __handler() {
        updatePromise([...promise, getMessage()])
    }

    return (
        <>
          <div className="text-right mb-4">
            <Button onClick={__handler}>新增</Button>
          </div>
          {
            promise.map((item, index) => (
                <Suspense fallback={<Skeleton />} key={`hello ${index}`}>
                    <User promise={item} index={index} key={index} />
                </Suspense>
            ))
          }
        </>
    )
}

function User(props) {
    const result = use(props.promise)
    return (
        <Userinfo index={props.index} username={result.id} message={result.value} />
    )
}


export default Demo02