import { useState } from 'react'
import { fetchList } from './api'

const Index = () => {
    const [promises, increasePromise] = useState(() => [fetchList()])

    const onLoadMore = () => {
        increasePromise([...promises, fetchList()])
    }
}