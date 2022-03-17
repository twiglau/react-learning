
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 我们把页面分成若干的独立的部分,单独编写,单独维护
 * 函数组件
 * 
 * 1. 一个返回普通React元素的函数就是一个合法的 React 组件
 * 2. 组件需要返回一个并且仅能返回一个React元素
 * 3. 组件的名称必须大写字母开头
 * 
 * 1. 收集属性对象 props {name:"lau",age:10}
 * 2. 会把props对象传入Welcome函数,并得到一个返回值 React 元素
 */

function Welcome1({name,age}){
  return <div> 
    <h1> hello {name}</h1>
    <h1> your age {age}</h1>
    </div>
}

// 1. <Welcome name="lau" age={10} />
// 2. <Welcome name={data.name} age={data.age} />
// 3. <Welcome {...data} />
let data = {name:"lau", age:10}

/**
 * 类组件
 * 1. 收集属性对象 props {name:"lau",age:10}
 * 2. 把属性对象传递给Welcome类的构造函数,并得到Welcome类的实例
 * 3. 调用render方法获取返回值, 也是一个React元素
 */
class Welcome extends React.Component {
  constructor(props){
    super(props) // this.props = props
  }
  render(){
     //空标签 React.Fragment
    return <> 
      <h1> hello {this.props.name}</h1>
      <h1> your age {this.props.age}</h1>
      </>
  }
}
ReactDOM.render(<Welcome {...data} />,document.getElementById('root'));



