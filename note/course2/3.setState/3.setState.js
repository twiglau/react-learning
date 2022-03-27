
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 解决 this 指针的三种方法
 * 1. this.add.bind(this) 把add方法里面的 this 指针绑定为组件实例
 * 2. 使用匿名函数 () => this.add()
 * 3. 类的属性: 直接 赋给组件实例, 而不是放在原型上的
 * 给类的实例增加一个 add 的属性, 而这个属性里的 this 绑死为组件的实例
 * add = () => {
 *    console.log('this',this)
 *    this.setState({number: this.state.number + 1})
 * }
 */
class Counter extends React.Component {
  constructor(props){
    super(props);
    this.state = {number:0,name:'lau'} //初始值是 number: 0
  }
  add = () => {
    console.log('this',this)
    //Cannot read properties of undefined (reading 'setState')
    // this.setState({number: this.state.number + 1})
    // 强制更新, 不管状态和属性改变没有
    // this.state.number = this.state.number + 1;
    // this.forceUpdate()

    // 2. setState 更新可能是异步的
    // this.setState({number: this.state.number + 1});
    // console.log(this.state.number); // 0
    // this.setState({number: this.state.number + 1});
    // console.log(this.state.number); // 0

    // 2.1 解决上面问题
    // 当调用setState的时候, 其实状态并没有直接改变, 而是放入一个队列当中.
    /**
    this.setState((state) => ({number: state.number+1}),() => {
      console.log(this.state.number); // 2
    })
    this.setState((state) => ({number: state.number + 1}),() => {
      console.log(this.state.number); // 2
    })
     * 
     */

    // 3 state更新会被合并: 会覆盖原变量,增加原变量. 没有删除功能
    this.setState({number: this.state.number + 1})
    
  }
  render() {
    // console.group('打印属性')
    // console.log(this.__proto__)
    // console.log(this.hasOwnProperty('add'))
    // console.log(this.hasOwnProperty('render'))
    // console.groupEnd('打印属性-end')
    return (
      <>
      <p>{this.state.name}</p>
        <p>{this.state.number}</p>
        <button onClick={this.add}>+</button>
      </>
    )
  }
}
ReactDOM.render(<Counter />,document.getElementById('root'));



