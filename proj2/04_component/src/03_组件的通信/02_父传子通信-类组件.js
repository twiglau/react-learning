import React, { Component } from 'react'

function ChildCpn2(props) {
  const { name, age, height } = props
  return <h2>子组件展示数据2: {name + ' ' + age + ' ' + height }</h2>
}
// props
class ChildCpn extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        console.log(this.props);
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
