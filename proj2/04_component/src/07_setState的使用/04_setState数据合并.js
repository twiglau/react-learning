import React, { Component } from 'react'

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      message: 'Hello World',
      name: 'purple'
    }
  }
  render() {
    return (
      <div>
        <h2>名字: {this.state.name}</h2>
        <h2>当前计数: { this.state.message }</h2>
        <button onClick={ e=> this.changeText()}>加一</button>
      </div>
    )
  }

  changeText(){
    //问题： 会不会把 name 属性 覆盖掉？
    //源码： Object.assign({}, prevState, partialState);
    this.setState({
      message: 'the data after updated'
    });
    // Object.assign({},this.state, {message: 'the data after updated'})

  }
}