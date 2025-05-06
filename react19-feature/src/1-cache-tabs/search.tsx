
import Skeleton from "@/components/skeleton";
import { getUsersInfo } from "@/utils/api";
import clsx from "clsx";
import { Suspense, useState } from "react";
import Input from "./input";
import List from "./list";


export default function Search(props: { selected: boolean}) {
  const [promise,update] = useState(getUsersInfo)

  const __inputChange = () => {
    promise.cancel()
    update(getUsersInfo())
  }

  const cls = clsx('space-y-2', {
    ['hidden']: !props.selected
  })

  return (
    <div className={cls}>
      <Input onChange={__inputChange} placeholder='Enter your keywords' />
      <Suspense fallback={<Skeleton />}>
        <List promise={promise} />
      </Suspense>
    </div>
  )
}