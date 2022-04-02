import * as types from '../actionTypes';
export default {
    login(username, password){
        return {
            type: types.LOGIN_REQUEST,
            payload: {username, password}
        }
    },
    logout(){
        return {type: types.LOGOUT_REQUEST}
    }
}