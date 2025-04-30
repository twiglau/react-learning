import clsx from 'clsx'
import { useFormStatus } from 'react-dom'

export default function Input(props) {
    const { type = 'text', ref, className, required, label, help = '此项规则不匹配', pattern, ...other } = props
    const { pending } = useFormStatus()

    
    const cls = clsx('flex items-center my-10', className)

    return (
        <div className={cls}>
            {label && (<label className='w-20 text-right font-bold'>{label}: </label>)}
            <div className='input flex-l'>
            <input
            ref={ref}
            type={type}
            required={required}
            pattern={pattern}
            {...other}
            disabled={pending}
            />
            </div>
        </div>
    )
}