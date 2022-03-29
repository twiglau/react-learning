import counter1 from './counter1';
import counter2 from './counter2';

import { combineReducers } from 'redux';
const reducers = combineReducers({
    counter1,//0
    counter2 //0
});

/**
 * 
 * state = {counter1:0, counter2:0}
 * state = {x:0, y:0}
 */
function combineReducers1(reducers){
    return function(state, action){
        let newState = {};
        newState.counter1 = counter1(state.counter1, action);
        newState.counter2 = counter2(state.counter2, action);
        return newState;
    }

}

export default reducers;