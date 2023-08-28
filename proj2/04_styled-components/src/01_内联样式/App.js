import React, { PureComponent } from 'react'

export default class App extends PureComponent {
  
    constructor(props) {
        super(props);
        this.state = {
            color: "red"
        }
    }
    render() {
        const pStyle = {
            color: this.state.color,
            textDecoration: "underline"
        }
        return (
        <div>
            <h2 style={{fontSize:"12px"}}>我是标题</h2>
            <p style={pStyle}>一段文字描述</p>
        </div>
        )
    }
}
