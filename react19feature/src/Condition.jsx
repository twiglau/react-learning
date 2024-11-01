import { use, useState  } from 'react'
import Message from './Message'
import Button from './Button'
import Skeleton from './Skeletion'

const _api2 = new Promise((resolve) => {
    resolve({ value: `
        Unlike React Hooks, use can be called within loops and conditional statements like if. 
        Like React Hooks, the function that calls use must be a Component or Hook.
        `})
})

export default function Demo01() {
    const [ loading, setLoading ] = useState(false)

    let result = { value: '' }
    if(!loading) {
        result = use(_api2)
    }
    const btnClick = (e) => {
        console.log('load:', loading, e)
        setLoading(!loading)
    }

    return (
        <div style={{background:'#1478FF'}}>
            {loading ? <Skeleton /> : <Message message={result.value} />}
            <div className='text-right'>
                <Button onClick={ e => btnClick(e)}>切换</Button>
            </div>
        </div>
    )
}