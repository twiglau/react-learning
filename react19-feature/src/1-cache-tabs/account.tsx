import Skeleton from "@/components/skeleton";
import { getUsersInfo } from "@/utils/api";
import clsx from "clsx";
import { Suspense, useState } from "react";
import CurrentList from "./list";


export default function Account(props: { selected: boolean}) {
  const [promise] = useState(getUsersInfo)

  const cls = clsx({
    'hidden': !props.selected
  })

  return (
    <div className={cls}>
      <Suspense fallback={<Skeleton />}>
        <CurrentList promise={promise} />
      </Suspense>
    </div>
  )
}