import React, { PureComponent } from 'react'

function getRenderTime(WrappedComponent){
  const NewComp = class extends PureComponent {
    // 即将渲染获取一个事件 beginTime
    UNSAFE_componentWillMount(){
      this.beginTime = Date.now();
    }
    // 渲染完成再获取一个时间 endTime
    componentDidMount(){
      this.endTime = Date.now()
      const interval = this.endTime - this.beginTime;
      console.log(`Home 渲染时间: ${interval}`);
    }
    render(){
      return <WrappedComponent {...this.props} />
    }

  }
  NewComp.displayName = 'RenderTime'
  return NewComp

}

class Home extends PureComponent {
    
    render(){
        return <h2>
        Home : 高阶组件
        <br />
        {`昵称: ${this.props.nickname} 等级: ${this.props.level} 区域: ${this.props.region}`}
        </h2>
    }
}
class About extends PureComponent {
    render(){
        return <h2>
              About : 普通用法
         </h2>
    }
}
const TimeHome = getRenderTime(Home)
const TimeAbout = getRenderTime(About)
export default class App extends PureComponent {
  render() {
    return (
      <div>
        <TimeHome />
        <TimeAbout />
      </div>
    )
  }
}
