import React, { PureComponent } from 'react'
// 1. 使用自己的connect
// import { connect } from '../utils/connect'

// 2. 使用react-redux的connect
import { connect } from 'react-redux'
import { incAction, decAction } from '../2-store/counter/actionCreators';
class home extends PureComponent {
  
  render() {
    return (
      <div>
        <h1>Home3</h1>
        <h2>当前计数： {this.props.counter}</h2>
        <button onClick={e => this.props.increment()}>+1</button>
        <button onClick={e => this.props.decrement()}>-1</button>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    counter: state.counterInfo.counter
  }
}
const mapDispatchToProps = dispatch => {
  return {
    increment:function() {
      dispatch(incAction())
    },
    decrement:function() {
      dispatch(decAction())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(home)
