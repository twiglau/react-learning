import React, { PureComponent } from 'react'
import { Button } from 'antd';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import './switchtransition.css';
export default class SwitchTransitionDemo extends PureComponent {
  state = {
    isOn: false
  }
  render() {
    const { isOn } = this.state
    return (
      <div>
        <SwitchTransition mode="in-out">
          <CSSTransition key={isOn? 'on':'off'} classNames="btn">
            <Button onClick={e => this.setState({isOn: !isOn})}>{isOn ? 'ON' : 'OFF'}</Button>
          </CSSTransition>
        </SwitchTransition>
      </div>
    )
  }
}
