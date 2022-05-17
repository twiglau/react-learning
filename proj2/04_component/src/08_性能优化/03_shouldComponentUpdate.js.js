import React, { Component } from 'react'

export default class App extends Component {
    state = {
        counter: 0,
        message: 'Hello world'
    }
    render() {
        console.log('App render函数被调用');
        return (
            <div>
                <h2>当前计数: {this.state.counter}</h2>
                <button onClick={e => this.increment()}>加一</button>
                <button onClick={e => this.changeText()}>改变文本</button>
            </div>
        )
    }
    shouldComponentUpdate(nextProps, nextState){
        if(this.state.counter != nextState.counter){
            return true
        }
        return false;
    }
    increment() {
        this.setState({
            counter: this.state.counter + 1
        })
    }
    changeText(){
        this.setState({
            message: '秀三多'
        })
    }
}
