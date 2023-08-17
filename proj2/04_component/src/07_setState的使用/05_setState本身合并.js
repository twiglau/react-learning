import React, { Component } from 'react'

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      counter:0,
    }
  }
  render() {
    return (
      <div>
        <h2>当前计数: { this.state.counter }</h2>
        <button onClick={ e=> this.changeText()}>加一</button>
      </div>
    )
  }

  changeText(){
    // 1. setState 本身被合并
    // 1.1 do{}white(true) 循环
    // 1.2 对setState 进行合并
    // Object.assign({}, prevState, partialState)

    // this.setState({
    //   counter: this.state.counter + 1
    // });
    // this.setState({
    //   counter: this.state.counter + 1
    // });
    // this.setState({
    //   counter: this.state.counter + 1
    // });

    // 2. setState 合并时进行累加
    this.setState((prevState, props)=>{
      return {
        counter: prevState.counter + 1
      }
    });
    this.setState((prevState, props)=>{
      return {
        counter: prevState.counter + 1
      }
    });
    this.setState((prevState, props)=>{
      return {
        counter: prevState.counter + 1
      }
    });
  }
}
