import React, { PureComponent } from 'react'
import { HYInput } from './styled'
export default class profile extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      color: 'orange'
    }
  }
  render() {
    return (
      <div>
        <HYInput type='password' color={this.state.color} />
        <h2>我是Profile的标题</h2>
        <ul>
          <li>设置列表1</li>
          <li>设置列表2</li>
          <li>设置列表3</li>
        </ul>
      </div>
    )
  }
}
