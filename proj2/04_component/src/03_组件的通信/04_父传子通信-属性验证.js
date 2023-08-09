import React, { Component } from 'react'
import PropTypes from 'prop-types'

function ChildCpn2(props) {
    const { name, age, height } = props
    return <h2>子组件展示数据2: {name + ' ' + age + ' ' + height }</h2>
}
ChildCpn2.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    height:PropTypes.number,
    names:PropTypes.array
}
export default class App extends Component {
  render() {
    return (
      <div>
        <ChildCpn2 name="lau" age={18} height={1.88} names={['a', 'b']} />
      </div>
    )
  }
}
