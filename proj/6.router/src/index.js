import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route,Link} from './react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
import 'bootstrap/dist/css/bootstrap.css';
// Router 是路由的容器
ReactDOM.render(
    <Router>
       <>
       <nav className='navbar navbar-inverse'>
           <div className='container-fluid'>
               <div className='navbar-heading'>
                  <a className='navbar-brand'>twig</a>
               </div>
               <ul className='nav navbar-nav'>
                   <li><Link to={{pathname:'/',state:'首页state'}}>首页</Link></li>
                   <li><Link to="/user">用户中心</Link></li>
                   <li><Link to="/profile">简介</Link></li>
               </ul>
           </div>
        </nav>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <Route path="/" component={Home} exact/>
                    <Route path="/user" component={User} />
                    <Route path="/profile" component={Profile} />
                </div>
            </div>
        </div>
       </>
    </Router>,
    document.getElementById('root')
)