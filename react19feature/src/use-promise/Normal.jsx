import { Suspense } from 'react'
import Skeleton from '../Skeletion'
import Message from './MessageNormalComp'

export default function Index() {
    return (
        <Suspense fallback={<Skeleton />}>
            <Message 
            message='这个一个普通的 UI 组件, Skeleton 组件不会有任何渲染机会,直接渲染 Message 组件'
            title='Primary'
            />
        </Suspense>

    )
}