import React, { PureComponent } from 'react'
// 1. 使用自己的connect
// import { connect } from '../utils/connect'
import axios from 'axios'
// 2. 使用react-redux的connect
import { connect } from 'react-redux'
import { incAction, decAction, changeBannersAction, changeRecommendAction } from '../2-store/actionCreators';
class home extends PureComponent {
  
  componentDidMount() {
    axios({
      url: 'http://123.207.32.32:8000/home/multidata'
    }).then(res => {
      const data = res.data.data;
      this.props.changeBanners(data.banner.list)
      this.props.changeRecommends(data.recommend.list)
    })
  }
  render() {
    return (
      <div>
        <h1>HomeAsync</h1>
        <h2>当前计数： {this.props.counter}</h2>
        <button onClick={e => this.props.increment()}>+1</button>
        <button onClick={e => this.props.decrement()}>-1</button>
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
    increment:function() {
      dispatch(incAction())
    },
    decrement:function() {
      dispatch(decAction())
    },
    changeBanners(banners) {
      dispatch(changeBannersAction(banners))
    },
    changeRecommends(recommends) {
      dispatch(changeRecommendAction(recommends))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(home)
