import React, { PureComponent } from 'react'

import { connect } from 'react-redux'
import { getHomeMultiDataAction } from '../2-store/actionCreators';
class home extends PureComponent {
  
  componentDidMount() {
    this.props.getHomeMultiData()
  }
  render() {
    return (
      <div>
        <h1>Redux Thunk 使用</h1>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    counter: state.counter
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getHomeMultiData() {
      // 传入函数名，不要调用。会在action中主动的调用
      dispatch(getHomeMultiDataAction);
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(home)
