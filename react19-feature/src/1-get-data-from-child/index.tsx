import Skeleton from "@/components/skeleton";
import { getUsersInfo } from "@/utils/api";
import { Suspense, useState } from "react";
import { tabs } from "./config";
import List from "./list";
import Tabs from "./tabs";

/**
 * 这里设计了一个 随机数量的请求，
 * 每一次请求返回随机数量的列表，Tabs中的按钮旁边需要显示当前列表的长度。
 * 
 * 但是此时，和将列表数据直接维护到 state 中不同， 此时我们在 state 中维护的是 promise.
 * 然后我们使用 use 从 promise 中读取数据。 所以只有子组件使用 use 读取才能获得列表的长度。
 * 这个时候，我们如何在保持现有解决按钮的前提之下，在父组件中拿到列表的数据呢？
 * @returns 
 */

export default function TabDemo03() {
  const [_tabs, changeTabs] = useState(tabs)
  const [selected, switchToSelected] = useState(() => _tabs.findIndex(tab => tab.current))
  const [promise, update] = useState(getUsersInfo)

  function __handler(index:number) {
    _tabs[selected].current = false
    _tabs[index].current = true
    switchToSelected(index)
    changeTabs([..._tabs])

    promise.cancel()
    
    update(getUsersInfo())
  }
  function __completed(num:number) {
    _tabs[selected].count = num
    changeTabs([..._tabs])
  }

  return (
    <div className='space-y-4'>
      <Tabs tabs={tabs} onSwitch={__handler} />
      <Suspense fallback={<Skeleton />}>
        {/* 1. 父组件要拿到子组件的数据，我们可以给子组件传一个事件进去
        让子组件在得到数据时，执行这个事件回调 */}
        <List promise={promise} onCompleted={__completed} />
      </Suspense>
    </div>
  )
}