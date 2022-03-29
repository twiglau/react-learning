import * as types from '../action-types'
export default {
    increment(){
        // store.dispatch({type:INCREMENT})
        return {type:types.INCREMENT}
    },
    decrement(){
        // store.dispatch({type:DECREMENT})
        return {type:types.DECREMENT}
    }
}