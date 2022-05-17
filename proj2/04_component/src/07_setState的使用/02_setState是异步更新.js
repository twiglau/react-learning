import React, { Component } from 'react'

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      message: 'Hello World'
    }
  }
  render() {
    return (
      <div>
        <h2>当前计数: { this.state.message }</h2>
        <button onClick={ e=> this.changeText()}>加一</button>
      </div>
    )
  }
  componentDidUpdate(){
      // 方式二: 获取异步更新的 state
      console.log('componentDidUpdate',this.state.message);
  }

  changeText(){
    //2 . setState 是异步更新的
    // this.setState({
    //   message: 'I change the text'
    // })
    // console.log(this.state.message);
    // 方式一: 获取异步更新后的数据
    this.setState({
        message: 'the data after updated'
    },()=>{
        console.log('setStateCallback',this.state.message);
    });

  }
}

/**
 * 异步更新好处:
 * 1. 如果每次调用 setState 都进行一次更新, 意味着 render函数会被频繁调用, 界面重新渲染, 这样效率是很低的;
 * 2. 最好的办法应该是获取到多个更新, 至今进行批量更新;
 * 
 * 如果同步更新了 state, 但是还没有执行 render函数, 那么 state和props不能保持同步;
 * > state 和 props 不能保持一致性, 会在开发中产生很多的问题;
 */