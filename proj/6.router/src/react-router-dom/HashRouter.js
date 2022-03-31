import React, { Component } from 'react';
import Context from './context';
export default class HashRouter extends Component {
    // 两个私有属性
    state = {
        location: {pathname:window.location.hash.slice(1), state:null}
    }
    locationState=null
    componentDidMount(){
        window.location.hash = window.location.hash || '/'; //默认值就是 /
        window.addEventListener('hashchange',()=>{
            this.setState({
                location:{
                    ...this.state.location,
                    pathname:window.location.hash.slice(1),
                    state: this.locationState
                }
            });
        });
    }
    render(){
        let that = this;
        let value = {
            location: this.state.location,
            history:{
                push(to){//定义一个history对象,有一个push方法来跳转路径
                    if(typeof to === 'object'){
                        const { pathname:path,state} = to
                        that.locationState = state; // 暂存
                        window.location.hash = path;
                    }else{
                        let path = to
                        that.locationState = null;
                        window.location.hash = path;
                    }
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