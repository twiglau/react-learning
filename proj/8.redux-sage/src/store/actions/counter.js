
import * as types from '../actionTypes';
export default {
    increment(){
        return {type:types.INCREMENT}
    },
    decrement(){
        return {type:types.DECREMENT}
    },
    asyncIncrement(){
        return {type:types.ASYNC_INCREMNET}
    }
}