import React, { Component } from 'react'

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
      </div>
    )
  }
}
