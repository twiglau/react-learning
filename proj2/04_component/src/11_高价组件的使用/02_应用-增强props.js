import React, { PureComponent } from 'react'

function enhanceRegionProps(WrappedComponent){
    return props => {
        return <WrappedComponent {...props} region="China" />
    }
}
class Home extends PureComponent {
    render(){
        return <h2>
            Home 
            {`昵称: ${this.props.nickname} 等级: ${this.props.level} 区域: ${this.props.region}`}
        </h2>
    }
}
const EnhanceHome = enhanceRegionProps(Home)
export default class App extends PureComponent {
  render() {
    return (
      <div>
        App 
        <EnhanceHome nickname="lau" level="99" />
      </div>
    )
  }
}
