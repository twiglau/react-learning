import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';
// import './test-redux'
// import { StoreContext } from './utils/context'
import { Provider } from 'react-redux'
import store  from './2-store'
import 'moment/locale/zh-hk';
import App from './App'
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
// 1. 自己定义的 Context
// root.render(
//   <StoreContext.Provider value={store}>
//     <App />
//   </StoreContext.Provider>
// );
// 2. 使用 react-redux 提供的
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
