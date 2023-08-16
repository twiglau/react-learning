import React, { Component } from 'react'

function ChildCpn2(props) {
  const { name, age, height } = props
  return <h2>子组件展示数据2: {name + ' ' + age + ' ' + height }</h2>
}
// props 在哪里进行保存的?
// react-test-renderer  pageckage
// ReactShallowRenderer
// 
class ChildCpn extends Component {
    constructor(props){
        super(props)
        console.log(this.props) // undefined
    }
    componentDidMount(){
        console.log(this.props); // 有值
    }
    render(){
        const { name, age, height } = this.props;
        return (
            <h2>子组件展示数据: {name + " " + age + " " + height}</h2>
        )
    }
}
export default class App extends Component {
  render() {
    return (
      <div>
         <ChildCpn name="a" age="18" height="200" />
         <ChildCpn2 name="a" age="18" height="200" />
      </div>
    )
  }
}
