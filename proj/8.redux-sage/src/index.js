import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import Counter from './components/Counter';
import Login from './components/Login';

ReactDOM.render(
    <>
    <Provider store={store}>
       <Login />
    </Provider>
    </>,
    document.getElementById('root')
)
