import React, { Component } from "react";

class ErrorBoundary extends Component {
    constructor(){
        super()
        this.state = { hasErrors: false}
    }
    // 可以用来捕获错误信息
    componentDidCatch(err,info){
        if(err){
            this.setState({
                hasErrors: true
            })
        }
    }
    render(){
        if(this.state.hasErrors){
            return <div> 子组件发生位置错误, 无法正常显示</div>
        }
        return this.props.children;
    }
}
function Clock(){
    console.log(null.toString());
    return <div style={{border:'5px solid green',padding:'5px'}}>{Date.now()}</div>
}
function Counter(){
    return <div style={{border:'5px solid blue',padding:'5px'}}>计数器</div>
}

export default class Page extends Component {
    render(){
        return (
            <div style={{border: 'solid 1px red',padding:'5px'}}>
                Page
                <ErrorBoundary>
                    <Clock />
                </ErrorBoundary>
                <Counter />
            </div>
        )
    }
}