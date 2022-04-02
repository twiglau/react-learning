
import * as types from '../actionTypes';
export default {
    increment(){
        return {type:types.INCREMENT}
    },
    asyncIncrement(){
        return {type:types.ASYNC_INCREMNET}
    }
}