
// import './1-learn-redux/index'
import store from './2-store/index'
import { addAction, subAction, incAction, decAction } from './2-store/actionCreators'

/**
 * 1. componentDidMount() 订阅
 * 2. this.setState 更新数据
 */
store.subscribe(() => {
    console.log(store.getState())
})
  

store.dispatch(addAction(10))
store.dispatch(addAction(5))
store.dispatch(subAction(5))
store.dispatch(subAction(5))
store.dispatch(decAction())
store.dispatch(incAction())