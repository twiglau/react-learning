import React, { Component } from 'react';
import RouterContext from './context';
export default class Prompt extends Component {
    static contextType = RouterContext;
    componentWillUnmount(){
        this.context.history.block(null);
    }
    render(){
        let history = this.context.history; // 从上下文中获取历史对象
        const { when, message } = this.props;
        if(when){
            // 阻拦
            history.block(message);
        }else{
            history.block(null)
        }
        return null
    }
}