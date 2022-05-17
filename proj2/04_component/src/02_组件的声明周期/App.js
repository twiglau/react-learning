import React, { Component } from 'react'

class Cpn extends Component {
    render(){
        return <h2>我是子组件</h2>
    }

    componentWillUnmount(){
        // 会在组件卸载以及销毁之前直接调用.
        // 1. 在此方法中执行必要的清理操作.
        // 2. 例如, 清除 timer, 取消网络请求或清除在 componentDidMount()
        // 中创建的订阅等;
        console.log('调用了 子组件的 componentWillUnmount 方法')
    }
}
export default class App extends Component {
    constructor(){
        // 函数中通常做两件事情:
        // 1. 通过给 this.state 赋值对象来初始化内部的 state;
        // 2. 为事件绑定实例 (this);
        super();
        this.state = {
            counter: 0,
            isSHow: true
        }
        console.log('执行了组件的 constructor');
    }

  render() {
      console.log('执行了组件的 render');
    return (
      <div>
        <h2>我是App组件</h2>
        <h3>当前计数: { this.state.counter}</h3>
        <button onClick={e=>this.increment()}>+1</button>
        <hr />
        {this.state.isSHow && <Cpn />}
        <button onClick={e=> this.changeCpnSHow()}>切换</button>
      </div>
    )
  }
  changeCpnSHow(){
      this.setState({
          isSHow: !this.state.isSHow
      })
  }
  increment(){
      this.setState({
          counter: this.state.counter + 1
      })
  }

  componentDidMount(){
      // 操作:
      // 1. 依赖于 DOM 的操作可以在这里进行;
      // 2. 在此处发送网络请求就最好的地方;
      // 3. 可以在此处添加一些订阅 (会在 componentWillUnmount取消订阅)
      console.log('执行了组件的 componentDidMount方法');
  }
  componentDidUpdate(){
      // 会在更新后会被立即调用, 首次渲染不会执行此方法.
      // 1. 当组件更新后, 可以在此处对 DOM 进行操作;
      // 2. 如果你对更新前后的 props 进行了比较, 也可以选择在此处进行网络请求;
      // (例如, 当 props 未发生变化时, 则不会执行网络请求.)
      console.log('执行了组件的 componentDidUpdate方法')
  }
}
