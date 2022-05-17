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
        <button id="btn">改变文本</button>
      </div>
    )
  }
  componentDidMount() {
      // 情况二: 原始DOM事件监听,同步更新
      document.getElementById('btn').addEventListener('click',()=>{

        this.setState({
            message: 'the data after updated'
        });
        console.log('同步更新二:',this.state.message);
      })
  }

  changeText(){
    // 情况一: 将 setState 放入到定时器中
    setTimeout(()=>{
        this.setState({
            message: 'the data after updated'
        });
        console.log('同步更新',this.state.message);
    },0);

  }
}


/**
 * 两种情况:
 * 1. 在组件生命周期 或 React 合成事件中, setState是异步;
 * 2. 在setTimeout或者原生DOM事件中, 是同步的
 */