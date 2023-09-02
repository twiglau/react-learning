import { Add_NUMBER, SUB_NUMBER, INCREMENT, DECREMENT} from './constant'

export const addAction = num=> ({
    type: Add_NUMBER,
    num
})
export const subAction = num => ({
    type: SUB_NUMBER,
    num
})
export const incAction = () => ({
    type: INCREMENT
})
export const decAction = () => ({
    type: DECREMENT
})
