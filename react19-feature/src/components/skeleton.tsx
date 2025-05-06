

const Skeleton = ({type = 'list'}: {type?: 'card'|'list'}) => {
  
  const items:number[] = [1,2,3,4]
  return (
    <div className="border border-blue-100 shadow rounded-md p-4 w-full">
      <div className="animate-pulse flex space-x-4">
        {
        type === 'list'
          ? <>
              <div className="rounded-full bg-slate-200 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                </div>
              </div>
            </>
          : <>
            {
              items.map(ele => (
                <div className="flex-1" key={ele}>
                  <div className="rounded-md bg-gray-200 h-32"></div>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                    <div className="h-2 bg-gray-200 rounded col-span-1"></div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mt-2">
                    <div className="h-2 bg-gray-200 rounded col-span-3"></div>
                  </div>
                </div>
              ))
            }
            </>
        }
      </div>
    </div>
  )

}

export default Skeleton