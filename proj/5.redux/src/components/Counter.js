import React, { Component} from "react";
// 1. 以下不需要手动引入
// import {bindActionCreators } from '../redux';
// import store from '../store'; // 不需要手动引入
// import actions from '../store/action';
// let boundActions = bindActionCreators(actions, store.dispatch)
import actions from '../store/actions/counter';
import { connect } from 'react-redux';
class Counter extends Component {
    // state = {number: store.getState()}
    componentDidMount(){
        //2. 取消手动订阅
        // this.unsubscribe = store.subscribe(()=>{
        //     this.setState({number: store.getState()})
        // });
    }
    componentWillUnmount(){
        //3. 取消手动订阅
        // this.unsubscribe();
    }
    render(){
        console.log({numCounter: this.props})
        return (
            <>
              <p>{this.props.number}</p>
              <button onClick={this.props.increment}>+</button>
              <button onClick={this.props.decrement}>-</button>
            </>
        )
    }
}

//{number: 0} => {number: 0} 将成为当前组件的属性对象
const mapStateToProps = state=>state;
const mapDispatchToProps = actions;
//connect 负责连接仓库和组件
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);