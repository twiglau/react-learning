import Input from "@/components/input";
import { formAction } from "./actions";
import SubmitButton from "./submit-button";



export default function FormStatus01() {
  return (
    <form action={formAction}>
      <Input label="Title" name="title" />
      <Input label="Content" name="content" />
      <div className='flex justify-end'>
        <SubmitButton>Submit</SubmitButton>
      </div>
    </form>
  )
}