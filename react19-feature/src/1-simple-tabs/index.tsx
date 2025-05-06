import { CurrentList01 } from "@/1-use-promise/list";
import Skeleton from "@/components/skeleton";
import { getUsersInfo } from "@/utils/api";
import { Suspense, useState } from "react";
import { tabs } from "./config";
import Tabs from "./tabs";



export default function TabDemo01() {
  const [current, switchToSelected] = useState(0)
  const [promise,update] = useState(getUsersInfo)

  function __handler(index:number) {
    tabs[current].current = false
    tabs[index].current = true
    switchToSelected(index)

    promise.cancel()
    update(getUsersInfo())
  }

  return (
    <div>
      <Tabs tabs={tabs} onSwitch={__handler} />
      <div className="mt-4 font-bold">
        当前选中： {tabs[current].name}
      </div>
      <Suspense fallback={<Skeleton />}>
        <CurrentList01 promise={promise} />
      </Suspense>
    </div>
  )
}