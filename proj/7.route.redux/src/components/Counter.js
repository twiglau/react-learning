import React from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions/counter';
// 纯 UI 组件
class Counter extends React.Component {
    render(){
        return (
        <div>
            <p>{this.props.number}</p>
            <button onClick={this.props.increment}>+</button>
            <button onClick={this.props.decrement}>-</button>
            <button onClick={this.props.goHome}>返回首页</button>
        </div>
        )
    }
}
export default connect(
    state=>state.counter,
    actions
)(Counter);