import Skeleton from "@/components/skeleton";
import { uuid } from "@/utils";
import { getUserInfo } from "@/utils/api";
import { Suspense, useState } from "react";
import { CurrentList } from "./list";


const Index = () => {
  const [promises, increasePromise] = useState(() => [getUserInfo()])

  const onLoadMore = () => {
    increasePromise([...promises, getUserInfo()])
  };

  return (
    <>
     {promises.map(promise => (
      <Suspense fallback={<Skeleton />} key={uuid()}>
        <CurrentList promise={promise} />
      </Suspense>
     ))}
     <div className='text-center my-4'>
      <button className='button' onClick={onLoadMore}>loading more</button>
     </div>
    </>
  )
}

export default Index;