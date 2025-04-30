import { useState, useRef,use } from 'react'
import Skeleton from '../Skeletion.jsx'
import { getMessage } from '../api.js'
import Message from './Message.jsx'

export default function Demo03() {
    let [ loading, setLoading ] = useState(true)

    const promise = useRef(getMessage().then(res => {

        setLoading(false)
        return res
   
     }))

    let result = { value: '', icon_url: '' }

    if(!loading) {
        result = use(promise.current)
        return <Message message={result.value} />
    }

    return <Skeleton />

}