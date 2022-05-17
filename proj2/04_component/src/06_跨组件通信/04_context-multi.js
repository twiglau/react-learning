




import React, { Component } from 'react'
// 创建 context 对象
const UserContext = React.createContext({
    username: 'twiger',
    level: -1
})
const ThemeContext = React.createContext({
    color: 'red'
})
function ProfileHeader() {
    return (
        <UserContext.Consumer>
            {
                value => {
                   return <ThemeContext.Consumer>
                        {
                            theme => {
                                return (
                                    <div style={{backgroundColor:theme.color}}>
                                        <h2>用户昵称:{value.nickname} </h2>
                                        <h2>用户等级:{value.level} </h2>
                                    </div>
                                )
                            }
                        }
                    </ThemeContext.Consumer>
                }
            }
        </UserContext.Consumer>
    )
}
function Profile(props){
    return (
        <div>
            <ProfileHeader />
            <ul>
                <ul>设置1</ul>
                <ul>设置2</ul>
                <ul>设置3</ul>
                <ul>设置4</ul>
            </ul>
        </div>
    )
}
export default class App extends Component {
    state = {
        nickname: 'purple',
        level: 99
    }
  
  render() {
    return (
      <div>
        <UserContext.Provider value={this.state}>
          <ThemeContext.Provider value={{color:'blue'}}>
              <Profile  />
          </ThemeContext.Provider>
        </UserContext.Provider>
      </div>
    )
  }
}

/**
 * 1. Class.contextType
 * 1.1 挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象;
 * 1.2 这能让你使用 this.context 来消费最近 Context 上的那个值;
 * 1.3 你可以在任何生命周期中访问到它, 包括 render 函数中;
 * 
 * MyClass.contextType = MyContext;
 * 
 * 2. Context.Consumer 
 * 2.1 这里, React 组件也可以订阅到 context 变更. 这能让你在 函数式组件 中完成订阅 context.  
 * 2.2 这里需要 函数作为子元素 (function as child) 这种做法;
 * 2.3 这个函数接受当前的 context 值, 返回一个 React 节点;
 */