import * as redux from 'redux';
import reducer from './reducer';

const store = redux.legacy_createStore(reducer);

export default store;