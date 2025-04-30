import Provider from './context'
import Todo from './todo'

export default function TodoList() {
    return (
        <Provider>
            <h3 className='font-bold'>Your Task</h3>
            <p className='!text-gray-400'>{`Here's a task for you!`}</p>
            <Todo />
        </Provider>
    )
}