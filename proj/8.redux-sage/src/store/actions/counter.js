
import * as types from '../actionTypes';
export default {
    increment(){
        return {type:types.INCREMENT}
    },
    stop(){
        return {type:types.CANCEL_COUNTER}
    },
    asyncIncrement(){
        return {type:types.ASYNC_INCREMNET}
    }
}