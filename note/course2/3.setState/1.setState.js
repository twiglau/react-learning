
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 1. 组件的数据来源有两个地方, 分别是属性对象和状态对象
 * 2. 属性是父组件传递过来的(默认属性, 属性校验)
 * 3. 状态是自己内部的,改变状态唯一的方式就是 setState
 * 4. 属性和状态的变化都会影响视图更新
 */
class Clock extends React.Component {
  constructor(props){
    super(props);
    // 在构造函数里, 是唯一可以给 this.state 赋初始值的地方
    this.state = { date: new Date().toLocaleTimeString()};
  }
  // 组件挂载完成后调用
  componentDidMount(){
    this.$timer = setInterval(()=>{
      // setState 1.修改状态  2.重新render
      this.setState({date:new Date().toLocaleTimeString()})
    },1000)
  }
  render() {
    return <div>时间: {this.state.date}</div>
  }
}
ReactDOM.render(<Clock />,document.getElementById('root'));



