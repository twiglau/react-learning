import { createContext, useState } from 'react'

const def = {
    task: 'TASK-8878',
    content: 'Try to calculate teh EXE feed, maybe it will index the multi-byte',
    status: 'Progress',
    priority: 'Medium'
}

export const Context = createContext()

export default function Provider({children}) {
    const [task,updateTask] = useState(def)

    return (
        <Context value={{task, updateTask}}>{children}</Context>
    )
}