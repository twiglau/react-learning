import { RefAttributes } from 'react'
import Input from './input'

export default function AddComment(props: RefAttributes<HTMLInputElement>) {
  return (
    <Input placeholder='Add Comment...' ref={props.ref} className='mt-4' />
  )
}