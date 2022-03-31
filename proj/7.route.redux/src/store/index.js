import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import { routerMiddleware } from '../connected-react-router';
import history from './history';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const presistConfig = {
    key: 'root',
    storage
}
const persistedReducer = persistReducer(presistConfig, reducers);
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
// const store = createStore(reducers);
// const store = applyMiddleware(routerMiddleware(history))(createStore)(reducers);
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(routerMiddleware(history))));
const persistor = persistStore(store)
window.store = store;

export {persistor,store};