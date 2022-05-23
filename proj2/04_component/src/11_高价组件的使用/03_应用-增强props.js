import React, { createContext, PureComponent } from 'react'

// 定义一个高价组件
function withUser(WrappedComponent){
  return props => {
    return <UserContext.Consumer>
      {
        user => {
          return <WrappedComponent {...props} {...user} />
        }
      }
    </UserContext.Consumer>
  }
}
// 创建 Context
const UserContext = createContext({
  nickname: '默认',
  level: -1,
  region: 'China'
})
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
        return <UserContext.Consumer>
          {
            user => {
              return <h2>
              About : 普通用法
              <br />
              {`昵称: ${user.nickname} 等级: ${user.level} 区域: ${user.region}`}
          </h2>
            }
          }
        </UserContext.Consumer>
    }
}
const UserHome = withUser(Home)
export default class App extends PureComponent {
  render() {
    return (
      <div>
        App 
        <UserContext.Provider value={{nickname:'twig',level:99, region: 'China'}}>
        <UserHome />
        <About />
        </UserContext.Provider>
      </div>
    )
  }
}
