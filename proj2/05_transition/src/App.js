import React, { PureComponent } from 'react'
import CSSTransitionDemo from './transition/CSSTransitionDemo'
import SwitchTransitionDemo from './transition/SwitchTransitionDemo'
import TransitionGroupDemo from './transition/TransitionGroupDemo'
import './App.css';
export default class App extends PureComponent {
  render() {
    return (
      <div style={{textAlign:'center'}}>
        <CSSTransitionDemo />
        <hr />
        <SwitchTransitionDemo />
        <hr />
        <TransitionGroupDemo />
      </div>
    )
  }
}
