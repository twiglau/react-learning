import React, { createRef, PureComponent } from 'react'

export default class App extends PureComponent {
   inputRef = createRef()
  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="username">
                用户: 
                {/**受控组件 */}
                <input type="text" 
                id="username" 
                ref={this.inputRef}/>
            </label>
            <button type='submit' value='提交'>提交</button>
        </form>
      </div>
    )
  }
  handleSubmit(e) {
      e.preventDefault();
      console.log({k: this.inputRef.current.value})
  }
}
