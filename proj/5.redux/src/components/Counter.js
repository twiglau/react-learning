import React, { Component} from "react";
// 1. 以下不需要手动引入
// import {bindActionCreators } from '../redux';
// import store from '../store'; // 不需要手动引入
// import actions from '../store/action';
// let boundActions = bindActionCreators(actions, store.dispatch)
import actions from '../store/actions/counter';
import { connect } from '../react-redux';
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
//1. 状态可能很大, 但此组件用的很少
//2. 可能需要增加 或者 减少,修改一些属性
//   即使映射的也不会触发渲染,也是为了性能优化
const mapStateToProps = state=>state;
const mapDispatchToProps = (dispatch) => {
    return {
        increment: (...args) => dispatch(actions.increment(...args)),
        decrement: (...args) => dispatch(actions.decrement(...args))
    }
};
//connect 负责连接仓库和组件
export default connect(
    mapStateToProps,
    actions
)(Counter);