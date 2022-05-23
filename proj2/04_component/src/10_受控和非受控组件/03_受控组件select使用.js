import React, { PureComponent } from 'react'

export default class App extends PureComponent {
    state = {
        fruits: 'banana'
    }
  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
            <select 
            name="fruits" 
            onChange={e => this.handleChange(e)}
            value={this.state.fruits}>
                <option value="apple">苹果</option>
                <option value="banana">香蕉</option>
                <option value="orange">橘子</option>
            </select>
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
          fruits:e.target.value
      })
  }
}
