
import React from 'react';
import ReactDOM from 'react-dom';

// 非受控组件值的是:
// DOM元素的值存在DOM元素的内部, 不收React控制  
// 受控组件值的是:
// DOM元素的的值受React状态控制

/**
 * 1. 不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的,并且它们也并不关心它是函数组件还是 class 组件
 * 2. 这就是为什么称 state 为局部的或是封装的原因. 除了拥有并设置了它的组件, 其他组件都无法访问  
 * 3. 任何的 state 总是所属于特定的组件, 而且从该 state 派生的任何数据或 UI 只能影响树中 "低于" 它们的组件  
 * 4. 如果你把一个组件构成的树想象成一个 props 的数据瀑布的话, 那么每一个组件的 state 就像是在任意一点上给瀑布增加额外的水源, 但是它只能向下流动
 */
class Form extends React.Component {
  constructor(props){
    super(props);
    this.state = {text:'hello'}
  }
  add = () => {
    console.log(this.state.text);
  }
  handleChange = (event) =>{
    this.setState({text:event.target.value});
  }
  changeText = (text) => {
    this.setState({text});
  }
  render(){
    return (
      <>
       <input value={this.state.text} onChange={this.handleChange}/>
       <Son  val={this.state.text} name={this.props.name} changeText={this.changeText}/>
       <button onClick={this.add}>add</button>
      </>
    )
  }
}

class Son extends React.Component {
  render(){
    console.log(this.props)
    return (
      <div style={{border:'1px solid red'}}>
      <div>val:{this.props.val} parentName:{this.props.name}</div>
      <input ref="myInput"/>
      <button onClick={()=> this.props.changeText(this.refs.myInput.value)}>改变父亲的text</button>
      </div>
    )
  }
}
ReactDOM.render(<Form name="lau"/>,document.getElementById('root'));



