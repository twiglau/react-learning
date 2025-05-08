
import { InputHTMLAttributes, RefAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type NormalInputProps = RefAttributes<HTMLInputElement> & InputHTMLAttributes<HTMLInputElement>
interface InputProps extends NormalInputProps {
  label: string
}

export default function CustomInput(props : InputProps) {
  const { label, ref, className, ...others } = props
  return (
    <label>
      {label}
      <input ref={ref} className={twMerge('!border-none', className)} {...others} />
    </label>
  )
}