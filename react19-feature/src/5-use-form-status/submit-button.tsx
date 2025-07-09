import Button from "@/components/button";
import { LoaderIcon } from 'lucide-react';
import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";


export default function SubmitButton({children}: PropsWithChildren) {
  const { pending } = useFormStatus()

  return (
    <div className='text-right'>
      <Button>
        { pending ? <div className='flex items-cetner justify-center gap-1'>
          <LoaderIcon className='animate-spin size-4' />
          <span>loading</span>
        </div>  : children }
      </Button>
    </div>
  )
}