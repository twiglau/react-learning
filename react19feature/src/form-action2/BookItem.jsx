
import { useActionState } from 'react'
import { submit } from './actions'
import SubmitAction from './SubmitButton'

function BookItem({id, title, onSubmit}) {
    const [count, formAction] = useActionState((cur, formData) => submit(cur, formData, onSubmit), 0)

    return (
        <form action={formAction} className='border p-4 my-3 rounded'>
            <h1 className='!my-2'>book name: {title}</h1>
            <input type='hidden' name='title' value={title} />
            <input type='hidden' name='id' value={id} />
            <div style={{marginBottom: '20px'}}>cart count: {count}</div>
            <SubmitAction>ADD TO CART</SubmitAction>
        </form>
    )
}

export default BookItem