import React  from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

export default class LifeCycle extends React.Component {
    // props = {age: 10, name: '计数器'}
    static defaultProps = {
        name: '计数器'
    }
    constructor(props){
        super(props); // this.props = props
        this.state = {number: 0,users:[]}; // 初始化默认的 状态对象
        console.log('1. constructor: [初始化]initialization set up props and state')
        fetch('https://api.github.com/users').then(res=>res.json()).then(users=>{
            console.log(unstable_renderSubtreeIntoContainer);
            this.setState({users})
        })
    }
    // willMount 在渲染过程中,可能会执行多次, 而 DidMount 永远只会执行一次
    componentWillMount() {
        console.log('2. componentWillMount: 组件将要挂载');
    }
    // 一般在这个里面执行副操作, 执行异步操作
    componentDidMount() {
        console.log('4. componentDidMount: 组件挂载完成');
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log('LifeCycle',nextProps,nextState);
        console.log('5. shouldComponentUpdate: 询问组件是否需要更新, 为 true, 走 6.');
        return true;
    }
    componentWillUpdate(){
        console.log('6. componentWillUpdate: 组件将要更新')
    }
    componentDidUpdate(){
        console.log('7. componentDidUpdate: 组件更新完毕')
    }
    add = ()=>{
        this.setState({number: this.state.number+1})
    }
    render() {
        console.log('3. render: render渲染, 也就是挂载')
        return (
            <div style={{border:'1px solid red',padding:'5px'}}>
              <p>{this.props.name}{this.state.number}</p>
              <button onClick={this.add}>+</button>
              <ul>
                  {
                      this.state.users.map(user=>(<li>{user.login}</li>))
                  }
              </ul>
              {this.state.number%2===0&&<SubCounter number={this.state.number}></SubCounter>}
            </div>
        )
    }
}

class SubCounter extends React.Component {
    constructor(props){
        super(props);
        this.state = { number: 0};
    }
    componentWillUnmount(){
        console.log('SubCounter 3.componentWillUnmount')
    }
    //调用此方法的时候会把新的属性对象和新的状态对象传过来
    shouldComponentUpdate(nextProps,nextState) {
        console.log('SubCounter',nextProps,nextState);
        if(nextProps.number%3===0){
            return true;
        }else{
            return false;
        }
    }
    // 组件收到新的属性对象
    componentWillReceiveProps(){
        console.log('SubCounter 1.componentWillReceiveProps')
    }
    render(){
        console.log('SubCounter 2.render');
        return (
            <div style={{border:'1px solid green'}}>
                <p>{this.props.number}</p>
            </div>
        )
    }
}