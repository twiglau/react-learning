
import { CALL_HISTORY_METHOD } from './constants';

export default function(path){
    return {
        type:CALL_HISTORY_METHOD,
        payload:{
            method: 'push',
            path
        }
    }
}