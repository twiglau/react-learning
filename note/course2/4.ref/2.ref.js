
import React from 'react';
import ReactDOM from 'react-dom';
class Form extends React.Component {
  constructor(props){
    super(props);
    this.textInput = React.createRef()
  }
  getFocus = () => {
    console.log(this.textInput.current.textInput.current);
    this.textInput.current.textInput.current.focus()
  }
  render(){
    return (
      <>
       <TextInput ref={this.textInput}/>
       <button onClick={this.getFocus}>focus</button>
      </>
    )
  }
}
// 0 测试
function createRef(){ return {current: null}}
class Form0 extends React.Component {
  constructor(props){
    super(props);
    this.textInput = createRef()
  }
  getFocus = () => {
    this.textInput.current.focus()
  }
  render(){
    return (
      <>
       <TextInput3 ref1={this.textInput}/>
       <button onClick={this.getFocus}>focus</button>
      </>
    )
  }
}
// 1.函数组件需要封装
function TextInput2(props, ref1){
  return <input ref={ref1} />
}
// 2.let TextInput3 = React.forwardRef(TextInput2);
// 3
let TextInput3 = forwardRef(TextInput2)
// 3.1 
function forwardRef(funcComponent) {
  return function(props){//{ref1:{currency: null}}
       return TextInput2(props,props.ref1);
  }
}
// 3.2
function forwardRef1(funcComponent){
  class Comp extends React.Component{
    render(){
      return funcComponent(this.props,this.props.ref1);
    }
  }
  return Comp;
}

class TextInput extends React.Component {
  constructor(props){
    super(props);
    this.textInput = React.createRef()
  }
  render(){
    return <input ref={this.textInput}/>
  }
}


ReactDOM.render(<Form0 />,document.getElementById('root'));



