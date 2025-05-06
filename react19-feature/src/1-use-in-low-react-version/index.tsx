import Skeleton from "@/components/skeleton";
import { getMessage } from "@/utils/api";
import { Suspense, useState } from "react";
import Userinfo from "./userinfo";



export default function Demo05() {
  const [promise, updatePromise] = useState(() => [getMessage()])

  function __handler() {
    updatePromise([...promise, getMessage()])
  }

  return <>
  <div className='text-right mb-4'>
      <button className='button' onClick={__handler}>新增数据</button>
    </div>
    <div className='space-y-4'>
      {promise.map((item,index) => (
        <Suspense fallback={<Skeleton />}>
          <Userinfo promise={item} index={index} />
        </Suspense>
      ))}
    </div>
  </>
}