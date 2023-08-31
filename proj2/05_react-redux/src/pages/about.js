import React, { PureComponent } from 'react'
import store from '../2-store';
import { addAction, subAction } from '../2-store/actionCreators';

export default class about extends PureComponent {
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
      store.dispatch(addAction(5))
    }
    decrement() {
      store.dispatch(subAction(4))
    }
  render() {
    return (
        <div>
          <h1>About</h1>
          <h2>当前计数： {this.state.counter}</h2>
          <button onClick={e => this.increment()}>+5</button>
          <button onClick={e => this.decrement()}>-4</button>
        </div>
      )
  }
}
