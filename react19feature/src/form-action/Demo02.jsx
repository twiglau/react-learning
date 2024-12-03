import Input from "../Input"
import Button from "../Button"
import { formAction } from "./actions"
import { useFormStatus } from 'react-dom'

/**
 * 
 * 1. action 支持传入异步回调函数. 
 * 2. 同时可以把 formAction 函数定义到组件外面, 有了这个特性,就可以非常方便的利用它来实现一些上传逻辑 . 
 * 3. 但如何实现 点击提交后, 接口请求的过程中, 按钮处于禁用状态呢?  - useFormStatus Hook 帮助
 *    import { useFormStatus } from 'react-dom'
 * 3.1 useFormStatus 能够在 form 元素的 子组件中, 获取到表单提交时的 pending 状态和表单内容. 
 *    const { pending, data, method, action } = useFormStatus()
 * 3.2 通常,在表单提交时, 不允许输入内容. useFormStatus 可以很容易帮我们做到这一点 . 
 */
export default function Demo02() {
    

    return (
        <form action={formAction}>
            <Input label='Title' name='title' />
            <Input2 name='content' />
            <SubmitButton>Submit</SubmitButton>
        </form>
    )
}

const Input2 = ({ name}) => {
    const { pending } = useFormStatus()

    return (
        <div className="form_item">
           <div className="label">Name</div>
           <input
           name={name}
           type="text"
           placeholder="Enter Your name"
           disabled={pending}
           />
        </div>
    )
}
const SubmitButton = ({children}) => {
    const { pending } = useFormStatus()
    return (
        <Button primary disabled={pending}>
            {pending ? 'loading...' : children }
        </Button>
    )
}