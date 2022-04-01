import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';

import rootSage from './sage';
const sageMiddleware = createSagaMiddleware()
const store = applyMiddleware(sageMiddleware)(createStore)(reducers);
// sageMiddleware 就是一个执行器, 可以启动 hellosSage 监听这个 generator 的执行
sageMiddleware.run(rootSage);
export default store;