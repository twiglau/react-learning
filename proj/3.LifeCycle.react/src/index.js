import React from 'react';
import ReactDOM from 'react-dom';
import GetSnapshotBeforeUpdate from './components/getSnapshotBeforeUpdate';
ReactDOM.render(
  <GetSnapshotBeforeUpdate name="calculator"/>,
  document.getElementById('root')
);

/**
 * 1. Context(上下文)
 * 1.1 在某些场景下, 你想在整个组件树中传递数据, 但却不想手动地在每一层传递属性, 你可以直接在 React 中使用强大的 context API 解决上述问题  
 * 1.2 在一个典型的 React 应用中, 数据是通过 props 属性自上而下(由父及子)进行传递的, 但这种做法对于某些类型的属性而言是及其繁琐的 (例如: 地区偏好, UI主题),
 * 这些属性是应用程序中许多组件都需要的, Context 提供了一种在组件之间共享此类值的方式,而不必显式地通过组件树的逐层传递 props
 */