import React, { Component } from 'react';
import Context from './context';
let pushState = window.history.pushState;
window.history.pushState = (state,title,url)=>{
    pushState.call(window.history,state,title,url);
    window.onpushstate.call(this,state,url);
}
export default class BrowserRouter extends Component {
    // 两个私有属性
    state = {
        location: {pathname:window.location.pathname, state:null}
    }
    componentDidMount(){
        
        window.onpopstate = (event)=>{
            this.setState({
                location:{
                    ...this.state.location,
                    pathname:window.location.pathname,
                    state: event.state
                }
            });
        }
        window.onpushstate = (state,pathname)=>{
            this.setState({
                location:{
                    ...this.state.location,
                    pathname,
                    state
                }
            });
        }
    }
    render(){
        let that = this;
        let value = {
            location: this.state.location,
            history:{
                push(to){//定义一个history对象,有一个push方法来跳转路径
                    // 阻拦消息
                    if(that.block){
                       let confirm = window.confirm(that.block(typeof to === 'object'?to:{pathname:to}));
                       if(!confirm) return;
                    }
                    if(typeof to === 'object'){
                        const { pathname:path,state} = to
                        window.history.pushState(state,'',path)
                    }else{
                        let path = to
                        window.history.pushState(null,'',path)
                    }
                },
                block(message){
                    that.block = message;
                }
            }
        }
        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        )
    }
}