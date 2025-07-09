import { Search } from "lucide-react";
import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
  classify?: 'Search' | 'Label'
}

export default function Input(props: InputProps ) {
  const { classify, label, ...others } = props
  return (
    <div className='flex items-center border border-gray-200 px-2 rounded text-gray-500'>
      {classify === 'Search' ? <Search size={18} /> : <label className='w-20 text-black font-bold text-sm'>{label}:</label>}
      <input className='flex-1 !border-none p-2 text-sm' type='text' {...others} />
    </div>
  )
}