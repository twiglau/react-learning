
import { Add_NUMBER, SUB_NUMBER, INCREMENT, DECREMENT } from './constant'

// 拆分counterReducer
const initialCounterState = { counter: 0 }
function counterReducer(state = initialCounterState, action) {
    switch(action.type) {
        case Add_NUMBER:
            return { ...state, counter: state.counter + action.num }
        case SUB_NUMBER:
            return { ...state, counter: state.counter - action.num }
        case INCREMENT:
            return { ...state, counter: state.counter + 1 }
        case DECREMENT:
            return { ...state, counter: state.counter - 1 }
        default:
            return state;
    }
}

export default counterReducer;