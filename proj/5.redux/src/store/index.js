
import { createStore } from '../redux';
import reducers from './reducers';

// let store = createStore(reducers,{counter1: 10, counter2: 10});
let store = createStore(reducers);
console.log(store.getState())
export default store;