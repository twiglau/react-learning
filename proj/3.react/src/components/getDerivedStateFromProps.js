import React from "react";

export default class Counter extends React.Component {
    constructor(){
        super();
        this.state = { number: 0};
    }
    add = ()=> {
        this.setState({number: this.state.number + 1})
    }
    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={this.add}>+</button>
                <SubCounter number={this.state.number} />
            </div>
        )
    }
}

class SubCounter extends React.Component {
    constructor() {
        super();
        this.state = { number: 0};
    }
    // 根据新的属性对象 派生 状态对象 
    // 参数: 新的属性对象 和 旧的状态对象
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.number%2==0){
            return {number:prevState.number + nextProps.number*2}
        }else{
            return {number:prevState.number + nextProps.number*3}
        }
    }
    render() {
        return (
            <div>
                {this.state.number} {this.state.date}
            </div>
        )
    }
}