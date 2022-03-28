import React,{ Component,PureComponent } from 'react';
// import PureComponent from './PureComponent';
// 1. 类组件
class Title1 extends PureComponent {
    render(){
        console.log('Title render')
        return <div>{this.props.title}</div>
    }
}
// 2. 函数组件 不能继承 PureComponent
function Title(props){
    console.log('Title render')
    return <div>{props.title}</div>
}
// 2.1 memo 函数
// Title = React.memo(Title);

// 2.2 自定义 memo
function memo(FuncComponent){
    return class extends PureComponent {
        render(){
            return <FuncComponent {...this.props} />
        }
    }
}
function memo2(FuncComponent){
    return class extends PureComponent {
        render(){
            return FuncComponent(this.props);
        }
    }
}
Title = memo2(Title);
class Counter extends PureComponent {
    render(){
        return <div>{this.props.number}</div>
    }
}
export default class Pure extends PureComponent {
    constructor(props){
        super(props);
        this.state = { title: '计数器', number: 0, num:{count: 0}};
        this.inputRef = React.createRef();
    }
    add = ()=> {
        // this.state.num.count = this.state.num.count + parseInt(this.inputRef.current.value);
        this.setState({
            number: this.state.number + parseInt(this.inputRef.current.value),
            // num:this.state.num // 这是同一个对象,直接 return true, 不会更新
            // num: {count: this.state.num.count} // 每次构建新的对象
        })
    }
    render(){
        console.log('Pure render')
        return (
            <div>
                <Title title={this.state.title} />
                <Counter number={this.state.number} />
                <input ref={this.inputRef} />
                <button onClick={this.add}>+</button>
            </div>
        )
    }
}