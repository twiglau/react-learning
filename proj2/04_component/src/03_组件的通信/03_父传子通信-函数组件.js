import React, { Component } from 'react'


function ChildCpn2(props) {
    const { name, age, height } = props
    return <h2>子组件展示数据2: {name + ' ' + age + ' ' + height }</h2>
  }
export default class App extends Component {
  render() {
    return (
      <div>
        <ChildCpn2 name="lau" age="18" height="1.88" />
      </div>
    )
  }
}
