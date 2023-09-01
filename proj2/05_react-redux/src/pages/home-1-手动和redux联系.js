import React, { PureComponent } from 'react'
import store from '../2-store';
import { incAction, decAction } from '../2-store/actionCreators';
export default class home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        counter: store.getState().counter
    }
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
        this.setState({
            counter: store.getState().counter
        })
    })
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  increment() {
    store.dispatch(incAction())
  }
  decrement() {
    store.dispatch(decAction())
  }
  render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>当前计数： {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <button onClick={e => this.decrement()}>-1</button>
      </div>
    )
  }
}
