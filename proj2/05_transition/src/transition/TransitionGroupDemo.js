import React, { PureComponent } from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import './transitiongroup.css';
export default class TransitionGroupDemo extends PureComponent {
  state = {
    names: ['无穷之海','欲望之城','拳击俱乐部']
  }
  render() {
    return (
      <TransitionGroup>
        {
          this.state.names.map((item, index)=>{
            return (
              <CSSTransition key={index} timeout={500} classNames="item">
                <div>{item}</div>
              </CSSTransition>
            )
          })
        }
        <button onClick={e => this.addName()}>添加</button>
      </TransitionGroup>
    )
  }
  addName(){
    this.setState({
      names: [...this.state.names, '皇帝心仪']
    })
  }
}
