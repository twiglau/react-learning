import React, { Component } from 'react'

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      counter: 0
    }
  }
  render() {
    return (
      <div>
        <h2>当前计数: { this.state.counter }</h2>
        <button onClick={ e=> this.increment()}>加一</button>
      </div>
    )
  }

  increment(){
    this.setState({
      counter: this.state.counter + 1
    })
  }
}
