import React, { PureComponent } from 'react'
import Home from '../home'
import Profile from '../profile'
export default class app extends PureComponent {
  render() {
    let a = "lau", b = "school";
    // 模板字符串
    function test(...args) {
      console.log(args)
    }
    // 1. 调用
    test('abc', 'cbd');
    // 2. 调用: 可以通过模板字符串的方式对一个函数进行调用
    test`aaaa`;
    // 3. 调用
    test`My name is ${a}, at ${b}`
    return (
      <div>
        <h2>我是app标题</h2>
        <Home />
        <Profile />
      </div>
    )
  }
}
