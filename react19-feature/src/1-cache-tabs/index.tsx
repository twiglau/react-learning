
import { useRef, useState } from "react";
import { tabs } from './config';
import Tabs from './tabs';
/**
 * 1. 初始化时，只渲染默认的当前列页，而不会渲染其他任何未被点击过的页面、组件。
 * 2. 渲染过的页面，在切换离开之后，需要缓存下来，下一次切换回来直接显示即可，效果类似于 keep-alive
 * 3. 每个tab按钮， 对应一个页面，按钮与页面之间应该是 1 对 1 的关系
 * 
 * 这里需要注意观察的是，
 * 案例中我们对 tabs数据和current当前选中项的一个管理方式。 在使用过程中，我们可以尽量
 * 减少对于state使用，能不用就不用。 但是许多人在开发过程中会非常依赖于state,管理不善时，
 * 可能会导致数据的大量冗余re-render产生。这里当我们切换点击时，会修改两个数据，但是最终
 * 只有一个state变化。
 */

export default function TabDemo02() {
  // TODO: 1. 为什么使用 useRef
  const t = useRef(tabs)
  const [selected, switchToSelected] = useState(t.current.findIndex(tab => tab.current))
  // TODO: 2. 为什么使用 useRef
  const map = useRef(new Set([t.current[selected]]))
  // 尽量避免使用 useState,减少state的使用，可以使状态变化更为清晰。
  // tabs, map 都是记录数据变化的，和状态无关，应该使用 useRef 
  // 避免 tabs, map 变化，引起组件渲染

  const item = { a: 1}

  const tempMap = new Set([item])
  if(tempMap.has(item)) {
    console.log('相等')
  }

  function __handler(index: number) {
    t.current[selected].current = false
    t.current[index].current = true

    const item = t.current[index]

    // TODO: 3. 为什么这里可以通过 has，判断是否有这个对象     
    if(!map.current.has(item)) {
      map.current.add(item)
    }

    switchToSelected(index)
  }

  const arr = Array.from(map.current)

  return (
    <div className='space-y-4'>
      <Tabs tabs={t.current} onSwitch={__handler} />
      {arr.map((item,index) => (
        <item.element selected={item.current} key={`v-${index}`} />
      ))}
    </div>
  )
}

