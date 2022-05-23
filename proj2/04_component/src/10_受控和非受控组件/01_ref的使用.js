import React, { PureComponent, createRef } from 'react'

class Counter extends PureComponent {
    state = {
        counter: 0
    }
    render(){
        return (
            <div>
                <h2>{this.state.counter}</h2>
                <button onClick={e => this.increment()}>加一</button>
            </div>
        )
    }
    increment(){
        this.setState({
            counter: this.state.counter + 1
        })
    }
}

export default class App extends PureComponent {
  titleRef2 = createRef();
  counterRef = createRef();
  titleEl = null;
  render() {
    return (
      <div>
          {/*ref=字符串 / 对象 / 函数 */}
        <h2 ref="titleRef">Hello React</h2>
        {/*目前react推荐的方式 */}
        <h2 ref={this.titleRef2}>Hello 2</h2>
        <h2 ref={(arg)=> this.titleEl = arg}>Hello ele</h2>
        <button onClick={e=>this.changeText()}>改变文本</button>

        <hr />
        <Counter ref={this.counterRef} />
        <button onClick={e => this.hanleClick()}> App 点击</button>
      </div>
    )
  }
  hanleClick(){
      this.counterRef.current.increment()
  }
  changeText(){
      // 1. 使用方式一: 字符串
      this.refs.titleRef.innerHTML = 'Hello react changed'
      // 2. 使用方式二: 对象
      this.titleRef2.current.innerHTML = 'Hello 2 changed'
      // 3. 使用方式三: 函数
      this.titleEl.innerHTML = 'Hello ele changed'
  }
}
