
// 用 react 需要使用 render 方法

import React from './react';

class SubCounter extends React.Component {
  componentWillMount(){
    console.log('SubCounter 将要挂载')
  }
  componentDidMount(){
    console.log('SubCounter 挂载完成')
  }
  render(){
    return '123'
  }
}
class Counter extends React.Component {
  constructor(props){
    super(props);
    this.state = {number: 1}
  }
  increment = ()=> {
    this.setState({
      number: this.state.number+1
    });
  }
  render(){
    let p = React.createElement('p',{}, this.state.number)
    let button = React.createElement('button',{onClick:this.increment},'+');
    return React.createElement('div', {style:{color:this.state.number%2 == 0? "red":"green",backgroundColor:this.state.number%2 == 0? "green":"red"}},p,button);
  }
}
function say(){
  console.log('say hello')
}
let element = <div name="xxx">hello <span>123</span> </div> 
// React.createElement('div', {name: 'xxx'}, 'hello', React.createElement('span',{},'123'))
element = React.createElement("div", {
  name: "xxx"
}, "hello ", React.createElement("button", {onClick:say, style:{color:'red',backgroundColor:'green'}}, "123"));
console.log(element);

element = React.createElement(Counter, {name: '计数器'});
// jsx 语法 => 虚拟dom 对象 类
React.render(element,document.getElementById('root'));