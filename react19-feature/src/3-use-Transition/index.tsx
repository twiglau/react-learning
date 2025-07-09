import Skeleton from "@/components/skeleton";
import Spin from "@/components/spin";
import { getMessage } from "@/utils/api";
import { Suspense, useState, useTransition } from "react";
import Message from "./message";


export default function Transition() {
  const [promise, update] = useState(getMessage())
  const [isPending, startTransition] = useTransition()

  function __handler() {
    startTransition(() => {
      update(getMessage())
    })
  }

  return (
    <>
    <div className='text-right mb-4'>
      <button className="button" onClick={__handler}>更新数据</button>
    </div>
    <Suspense fallback={<Skeleton />}>
      <Spin loading={isPending}>
        <Message promise={promise} />
      </Spin>
    </Suspense>
    </>
  )
}