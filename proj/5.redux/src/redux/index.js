import createStore from './createStore';
import bindActionCreators from './bindActionCreators';
import combineReducers from './combineReducers';
import applyMiddleware from './applyMiddleware';
export {
    createStore,//创建仓库
    bindActionCreators, //把actionCreator 和 dispatch方法绑定在一起
    combineReducers, // 合并 reducers
    applyMiddleware
}