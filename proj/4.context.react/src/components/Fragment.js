import React, { Component } from "react";

class TodoItems extends Component {
    // render 方法能且只能返回一个顶级元素
    render(){
        return (
            this.props.items.map((item,index)=><p key={index}>{item}</p>)
        )
    }
}
export default class Todos extends Component {
    constructor(){
        super()
        this.state = { items:['a', 'b', 'c']}
    }
    render() {
        return (
            <>
              <input /><button>+</button>
              <TodoItems items={this.state.items} />
            </>
        )
    }
}