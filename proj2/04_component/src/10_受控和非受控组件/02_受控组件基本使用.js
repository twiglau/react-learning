import React, { PureComponent } from 'react'

export default class App extends PureComponent {
    state = {
        username: ''
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
                onChange={e => this.handleChange(e)}
                value={this.state.username}/>
            </label>
            <button type='submit' value='提交'>提交</button>
        </form>
      </div>
    )
  }
  handleSubmit(e) {
      e.preventDefault();
      console.log({e})
  }
  handleChange(e) {
      this.setState({
          username:e.target.value
      })
  }
}
