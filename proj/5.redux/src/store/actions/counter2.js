import * as types from '../action-types'
export default {
    increment(){
        // store.dispatch({type:INCREMENT})
        return {type:types.INCREMENT2}
    },
    decrement(){
        // store.dispatch({type:DECREMENT})
        return {type:types.DECREMENT2}
    }
}