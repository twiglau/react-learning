import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import 'moment/locale/zh-hk';
import App from './App'
import { BrowserRouter } from 'react-router-dom'


//You should not use <withRouter(App) /> outside a <Router>
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, document.getElementById('root')
);
