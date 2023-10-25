import React, { memo, useEffect } from 'react'
import { connect } from 'react-redux'
import { getTopBannerAction } from './store/actionCreators'
const Recommend = memo((props) => {
  const { getBanners } = props
  useEffect(()=> {
    getBanners()
  },[getBanners])

  return (
    <div>Recommend</div>
  )
})

const mapStateToProps = state => ({
    topBanners: state.recommend.topBanners
})

const mapDispatchToProps = dispatch => ({
    getBanners: () => {
        // TODO dispatch 函数
        dispatch(getTopBannerAction())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
