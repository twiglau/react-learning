import { use } from 'react'
export default function Message(props) {
    const { promise, message } = props
    let result = {}
    if(promise) {
      result = use(promise)
    }
    
    return (
      <div className='flex border shadow'>
        <div>Heads Up!</div>
        <div>{result.value || message }</div>
      </div>
    )
  }