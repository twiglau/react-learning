import { useState,use } from 'react'
import { Context } from './theme-context'
import Switch from './Switch'

export default function Card() {
    const { count, incrementer } = use(Context)
    const [ theme, setTheme ] = useState('theme-light')
    const [ number, setNumber ] = useState(0)

    function __onSwitch(bool) {
        setTheme(bool ? 'theme-dark': 'theme-light')
        setNumber(number + 1)
        incrementer(count + 1)
    }


    return (
        <div className={theme}>
            <div className='context-card p-4 rounded transition'>
                <div className='title font-bold'>Canary</div>
                <div className='mt-4'>the useActionState Hook is currently only available </div>
            </div>
            <div className='flex justify-between py-4 items-center'>
                <div className='mr-4 text-green-500'>次数: {number}</div>
                <Switch onChange={__onSwitch}/>
            </div>
        </div>
    )
}