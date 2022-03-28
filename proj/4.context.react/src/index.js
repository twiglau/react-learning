import React from 'react';
import ReactDOM from 'react-dom';
import NewContext1 from './components/context/NewContext1';
import Person from './components/context/PropTypes';
import Pure from './components/pure/Pure'
import Logger from './components/highOrder/Logger'
import UserNameInput from './components/highOrder/SuperInput'
import EmailInput from './components/highOrder/EmailInput'
import Picture from './components/render/Picture'
import Fragment from './components/Fragment'
import Model from './components/Model'
import Page from './components/ErrorBoundary'
let props = {
  name: 'lau', // 字符串 必填
  age: 10, // 数字, 必填, 而且不能小于 18 岁
  gender: 'male', // 只能是 male 或者 female
  isMarried: true, // 是否已婚, 这是一个布尔值. 
  hobby: ['smoking', 'drinking'], // 字符串 数组
  position: { x: 100, y: 100} // x y 属性的对象
}

ReactDOM.render(
  <>
  <Page />
  </>,
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

/**
 * 4. render props
 * 4.1 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术
 * 4.2 具有 render prop 的组件接受一个函数, 该函数返回一个 React 元素并调动它
 * 而不是实现自己的渲染逻辑
 * 4.3 render prop 是一个用于告知组件需要渲染什么内容的函数 prop
 * 
 * <DateProvider render=(data)=> {
 *    <h1> hello {data.target}</h1>
 * )} />
 */


/**
 * 5. React.Fragment
 */


/**
 * 6. 插槽(Portals)
 * 6.1 Portals 提供了一种很好的方法, 将子节点渲染到父组件DOM层次
 * 结构之外的 DOM 节点.
 * 
 * ReactDOM.createPortal(child, container)
 * 
 * 6.2 第一个参数(child)是任何渲染的React子元素, 例如一个元素, 字符串 或 片段 (fragment)
 * 6.3 第二个参数(container)则是一个DOM元素
 */


/**
 * 7. 错误边界 (Error Boundaries)
 * 7.1 部分 UI 中的 javaScript 错误不应该破坏整个应用程序
 * 7.2 为了解决React用户的这个问题, React 16 引入了一个错误边界 (Error Boundaries) 的新概念
 * 7.3 错误边界是一个组件, 这个组件可以用来捕获它的子组件中产生的错误, 记录错误日志并在错误发生的时候, 展示一个
 * "回退" 或者说是一个错误信息页面, 以避免因为局部组件错误而导致的整个组件树崩溃
 * 7.4 错误边界可以在捕获其子组件的渲染, 生命周期以及构造函数内的错误
 * 7.5 这个组件是所有子组件发送错误的扑火者, 所有子组件的错误到达错误边界组件后, 错误信息被拦截并不再向上冒泡, 所以
 * 这个组件就是错误的一个边界
 * 7,6 原则上来讲, 错误边界是用来保证React可以正常渲染UI的, 而不是真的用来捕获异常的  
 * 7.7 自React 16 开始, 任何未被错误边界捕获的错误将会卸载整个 React 组件树.
 */
