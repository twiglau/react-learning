import * as types from '../actionTypes';
import { push} from '../../connected-react-router';
export default {
    increment(){
        return {type: types.INCREMENT}
    },
    decrement(){
        return {type: types.DECREMENT}
    },
    login(username,password){

    },
    goHome(){
        return push('/')
    }
}