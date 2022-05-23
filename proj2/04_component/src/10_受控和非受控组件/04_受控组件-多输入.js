import React, { PureComponent } from 'react'

export default class App extends PureComponent {
    state = {
        username: '',
        password: '',
        valid: ''
    }
  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="username">
                用户: 
                {/**受控组件 */}
                <input type="text" 
                id="username" 
                onChange={e => this.handleChange(e,'username')}
                value={this.state.username}/>
            </label>
            <br />
            <label htmlFor="password">
                密码: 
                {/**受控组件 */}
                <input type="text" 
                id="password" 
                onChange={e => this.handleChange(e,'password')}
                value={this.state.password}/>
            </label>
            <br />
            <label htmlFor="valid">
                验证码: 
                {/**受控组件 */}
                <input type="text" 
                id="valid" 
                onChange={e => this.handleChange(e, 'valid')}
                value={this.state.valid}/>
            </label>
            <br />
            <button type='submit' value='提交'>提交</button>
        </form>
      </div>
    )
  }
  handleSubmit(e) {
      e.preventDefault();
      console.log({e})
  }
  handleChange(e,key) {
      this.setState({
          // 计算属性名
          [key]:e.target.value
      })
  }
}
