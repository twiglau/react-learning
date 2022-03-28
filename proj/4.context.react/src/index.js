import React from 'react';
import ReactDOM from 'react-dom';
import NewContext1 from './components/context/NewContext1';
import Person from './components/context/PropTypes';
import Pure from './components/pure/Pure'
import Logger from './components/highOrder/Logger'
let props = {
  name: 'lau', // 字符串 必填
  age: 10, // 数字, 必填, 而且不能小于 18 岁
  gender: 'male', // 只能是 male 或者 female
  isMarried: true, // 是否已婚, 这是一个布尔值. 
  hobby: ['smoking', 'drinking'], // 字符串 数组
  position: { x: 100, y: 100} // x y 属性的对象
}
ReactDOM.render(
  <Logger name="Test"/>,
  document.getElementById('root')
);

/**
 * 1. Context(上下文)
 * 1.1 在某些场景下, 你想在整个组件树中传递数据, 但却不想手动地在每一层传递属性, 你可以直接在 React 中使用强大的 context API 解决上述问题  
 * 1.2 在一个典型的 React 应用中, 数据是通过 props 属性自上而下(由父及子)进行传递的, 但这种做法对于某些类型的属性而言是及其繁琐的 (例如: 地区偏好, UI主题),
 * 这些属性是应用程序中许多组件都需要的, Context 提供了一种在组件之间共享此类值的方式,而不必显式地通过组件树的逐层传递 props
 */

/**
 * 2. 类型检查
 * 2.1 要在组件的 props 上进行类型检查, 只需配置特定的 propTypes 属性
 * 2.2 可以通过配置特定的 defaultProps 属性来定义 props 的默认值
 * 2.3 组件 prop-types
 */

/**
 * 3. 高阶组件
 * 3.1 高阶组件就是一个函数,传给它一个组件,它返回一个新的组件
 * 3.2 高阶组件的作用其实就是为了组件之间的代码复用
 * const NewComponent = higherOrderComponent(OldComponent)
 */

