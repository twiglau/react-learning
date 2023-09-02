import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';
import './test-redux'
import { Provider } from 'react-redux'
import store  from './store'
import 'moment/locale/zh-hk';
import App from './App'
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
reportWebVitals();
