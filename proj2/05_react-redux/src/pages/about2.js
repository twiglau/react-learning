
import { connect } from '../utils/connect'
import { addAction, subAction } from '../2-store/actionCreators'
function About(props) {
    
    return (
        <div>
          <h1>About2</h1>
          <h2>当前计数： {props.counter}</h2>
          <button onClick={e => props.addNumber(5)}>+5</button>
          <button onClick={e => props.subNumber(4)}>-4</button>
        </div>
      )
}

const mapStateToProps = state => {
  return {
    counter: state.counter
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