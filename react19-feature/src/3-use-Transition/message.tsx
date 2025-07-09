import { getMessage } from "@/utils/api";
import { Tent } from "lucide-react";
import { use } from "react";


const Message = (props: { promise: ReturnType<typeof getMessage>}) => {
  const message = use(props.promise)

  return (
    <div className='flex border border-gray-200 dark:border-gray-700 p-4 rounded items-start'>
      <Tent />
      <div className='flex-1 ml-3'>
        <div>React introducation</div>
        <div className='text-sm leading-6 mt-2 text-gray-600 dark:text-gray-400'>
          {message.value}
        </div>
      </div>
    </div>
  )
}

export default Message