
import React from 'react';
import ReactDOM from 'react-dom';
// 受控组件 非受控组件 以及ref
// 1.ref = 字符 2. ref = 函数
class Sum extends React.Component {
  // 1. ref, 已经废弃
  add = ()=>{
    let numA = this.refs.numA.value;
    let numB = this.refs.numB.value;
    let result = parseFloat(numA) + parseFloat(numB);
    this.refs.result.value = result
  }
  render(){
    return (
      <>
       <input ref="numA"/>+<input ref="numB"/>
       <button onClick={this.add}>=</button>
       <input ref="result"/>
       </>
    )
  }
}
class Sum2 extends React.Component {
  
  add = ()=>{
    let numA = this.numA.value;
    let numB = this.numB.value;
    let result = parseFloat(numA) + parseFloat(numB);
    this.result.value = result
  }
  render(){
    return (
      <>
       <input ref={inst=>this.numA = inst}/>
       +
       <input ref={inst=>this.numB = inst}/>
       <button onClick={this.add}>=</button>
       <input ref={inst=>this.result = inst}/>
       </>
    )
  }
}

// 标准写法
class Sum3 extends React.Component {
  constructor(props){
    super(props);
    this.numA = React.createRef();
    this.numB = React.createRef();
    this.result = React.createRef();
  }
  add = ()=>{
    let numA = this.numA.current.value;
    let numB = this.numB.current.value;
    let result = parseFloat(numA) + parseFloat(numB);
    this.result.current.value = result
  }
  render(){
    return (
      <>
       <input ref={this.numA}/>
       +
       <input ref={this.numB}/>
       <button onClick={this.add}>=</button>
       <input ref={this.result}/>
       </>
    )
  }
}

function createRef() {
  return {current: null}
}
// 原理分析
class Sum4 extends React.Component {
  constructor(props){
    super(props);
    this.numA = createRef();//{current:null}
    this.numB = createRef();
    this.result = createRef();
  }
  add = ()=>{
    let numA = this.numA.current.value;
    let numB = this.numB.current.value;
    let result = parseFloat(numA) + parseFloat(numB);
    this.result.current.value = result
  }
  render(){
    return (
      <>
       <input ref={this.numA}/>
       +
       <input ref={this.numB}/>
       <button onClick={this.add}>=</button>
       <input ref={this.result}/>
       </>
    )
  }
}

ReactDOM.render(<Sum4 />,document.getElementById('root'));



