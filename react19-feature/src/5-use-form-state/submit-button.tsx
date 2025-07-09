import Button from "@/components/button";
import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";


export default function SubmitButton({children}: PropsWithChildren) {
  const { pending } = useFormStatus()

  return (
    <div className='text-right'>
      <Button primary disabled={pending}>
        {children} {pending ? '...':''}
      </Button>
    </div>
  )
}