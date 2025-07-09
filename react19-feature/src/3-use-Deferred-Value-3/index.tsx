import { tabs } from "@/1-cache-tabs/config"
import Tabs from "@/1-cache-tabs/tabs"
import List from "@/3-use-Deferred-Value-2/list"
import Skeleton from "@/components/skeleton"
import Spin from "@/components/spin"
import { getUsersInfo } from "@/utils/api"
import { Suspense, useDeferredValue, useState } from "react"


const Index = () => {
  const [selected, switchToSelected] = useState(tabs.findIndex(tab => tab.current))
  const [promise,update] = useState(getUsersInfo)
  const deferred = useDeferredValue(promise)

  function __handler(index: number) {
    tabs[selected].current = false
    tabs[index].current = true
    switchToSelected(index)

    promise.cancel()
    update(getUsersInfo())
  }

  return (
    <div className='space-y-2'>
      <Tabs tabs={tabs} onSwitch={__handler} />
      <Suspense fallback={<Skeleton />}>
        <Spin loading={deferred !== promise}>
          <List promise={promise} />
        </Spin>
      </Suspense>
    </div>
  )

}


export default Index