
import { LOCATION_CHANGE } from './constants';

export default function(history){
    const initState = {action: history.action, location: history.location};
    // 返回 reducer
    return function(state=initState, action){
        switch(action.type){
            case LOCATION_CHANGE:
                return action.payload;
            default:
                return state;
        }
    }
}