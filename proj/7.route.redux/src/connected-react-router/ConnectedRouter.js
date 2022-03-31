/**
 * 监听路径变化, 当路径变化是,会向store 派发 一个 路径改变的 action
 */
import React from 'react';
import { ReactReduxContext } from 'react-redux';
import { Router } from 'react-router'; // react-router-dom 是浏览器的 Router
import { LOCATION_CHANGE } from './constants';
export default class ConnectedRouter extends React.Component {
    static contextType = ReactReduxContext;
    componentDidMount(){
        // 每当路径发生变化之后, 都会执行此监听函数, 
        // 并传入二个参数: 新的路径和新的动作
        // history 仓库实例 监听变化
        this.unlistener = this.props.history.listen((location,action)=>{
            this.context.store.dispatch({
                type: LOCATION_CHANGE,
                payload: { location, action }
            })
        });
    }
    componentWillUnmount(){
        this.unlistener()
    }
    render(){
        const { history, children } = this.props;
        return (
            <Router history={history}>
                {children}
            </Router>
        )
    }
}

/**
 * HashRouter 就是一个拥有了 hashhistory 的 ReactRouter
 * <Router history={createHashHistory()}></Router>
 */