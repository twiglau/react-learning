
// import { connect } from '../utils/connect'


import { connect } from 'react-redux'
import { addAction, subAction } from '../2-store/counter/actionCreators'
function About(props) {
    
    return (
        <div>
          <h1>About3</h1>
          <h2>当前计数： {props.counter}</h2>
          <button onClick={e => props.addNumber(5)}>+5</button>
          <button onClick={e => props.subNumber(4)}>-4</button>
          <h4>Banner</h4>
          <ul>
            {
              props.banners.map(ele => (<li key={ele.acm}>{ele.title}</li>))
            }
          </ul>
          <h4>Recommend</h4>
          <ul>
            {
              props.recommends.map(ele => (<li key={ele.acm}>{ele.title}</li>))
            }
          </ul>
        </div>
      )
}

const mapStateToProps = state => {
  return {
    counter: state.counterInfo.counter,
    banners: state.homeInfo.banners,
    recommends: state.homeInfo.recommends
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addNumber: function(num) {
      dispatch(addAction(num))
    },
    subNumber: function(num) {
      dispatch(subAction(num))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About);