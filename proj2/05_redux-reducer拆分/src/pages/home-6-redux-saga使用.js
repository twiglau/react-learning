import React, { PureComponent } from 'react'

import { connect } from 'react-redux'
import { fetchHomeMultiDataAction } from '../2-store/home/actionCreators';
class home extends PureComponent {
  
  componentDidMount() {
    this.props.getHomeMultiData()
  }
  render() {
    return (
      <div>
        <h1>Redux Saga 使用</h1>
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
    getHomeMultiData() {
      dispatch(fetchHomeMultiDataAction);
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(home)
