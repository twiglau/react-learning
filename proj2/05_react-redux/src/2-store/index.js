import { legacy_createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import saga from './saga'
import reducer from './reducer';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
      })
    : compose;

// 创建sagaMiddleware中间件
const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware, sagaMiddleware),
  // other store enhancers if any
);
// 应用一些中间件
// applyMiddleware(中间件1， 中间件2，中间件3 )
// const enhancer = applyMiddleware(thunkMiddleware);


const store = legacy_createStore(reducer,enhancer);

sagaMiddleware.run(saga)

export default store;