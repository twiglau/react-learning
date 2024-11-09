

export default function Message(props) {
    const { message } = props
    
    
    return (
      <div className='flex border shadow'>
        <div>Normal Component!</div>
        <div>{ message }</div>
      </div>
    )
  }