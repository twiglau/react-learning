import Skeleton from "@/components/skeleton";
import { uuid } from "@/utils";
import { getMessage } from "@/utils/api";
import { Suspense, useEffect, useState } from "react";
import List, { UserInfo } from './list';
import { Userinfo01 } from "./userinfo";


/**
 * 旧的思路在实现上非常巧妙，但是简洁度依然弱于新的实现方案。
 * 初次之外， 旧的实现思路还有许多问题需要处理，例如初始化时请求了两次，
 * 我们要考虑接口防重的问题。 以及当我们多次连续点击按钮时，会出现竞态问题
 * 而导致渲染结果出现混乱。
 * @returns 
 */
export default function Page05() {
  // 定义一个状态用于存储列表
  const [list, updateList] = useState<UserInfo[]>([])

  useEffect(() => {
    // 在发送请求时，先往list中新增一条 type: loading 的数据。
    // 此时我们利用 list 的特性与闭包的缓存特性。
    // 在接口请求成功之后，再把请求过来的有效数据更新到list中即可。
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
      <div className='text-right mb-4'>
        <button className='button' onClick={__handler}>新增数据</button>
      </div>
      <List list={list} />
    </>
  )
}

export function Page06() {
  const [promise,updatePromise] = useState(() => [getMessage()])

  function __handler() {
    updatePromise([...promise, getMessage()])
  }

  return (
    <>
      <div className='text-right mb-4'>
        <button className='button' onClick={__handler}>新增数据</button>
      </div>
      <div className='space-y-4'>
        {promise.map((item,index) => (
          <Suspense fallback={<Skeleton />} key={uuid()}>
            <Userinfo01 promise={item} index={index} />
          </Suspense>
        ))}
      </div>
    </>
  )
}