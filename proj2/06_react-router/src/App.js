
import React, { useState } from 'react';

import { 
  NavLink,
  Route,
  Switch,
  withRouter
} from 'react-router-dom'

import { renderRoutes } from 'react-router-config'
import './App.css'

// import Home from './pages/home'
// import About from './pages/about'
// import Profile from './pages/profile'
// import User from './pages/user'
// import NoMatch from './pages/noMatch'
// import Login from './pages/login'
// import Product from './pages/product'
// import Detail from './pages/detail'
// import Detail2 from './pages/detail2'
// import Detail3 from './pages/detail3'
import routes from './router'

const App = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const links = [
    { to: "/", title: "首页"},
    { to: "/about", title: "关于"},
    { to: "/profile", title: "我的"},
  ]
  const jumpToProduct = ()=> {
    console.log('jumpToProduct')
    props.history.push("/product")
  }
  return (
    <div>
      
        {/* 1.NavLink的使用 */}
        {/* <NavLink exact to="/" activeStyle={{color:"blue"}}>首页</NavLink>
        <NavLink to="/about" activeStyle={{color:"blue"}}>关于</NavLink>
        <NavLink to="/profile" activeStyle={{color:"blue"}}>我的</NavLink> */}
        
        <NavLink exact to="/" activeClassName="link-active" >首页</NavLink>
        <NavLink to="/about" >关于</NavLink>
        <NavLink to="/profile" >我的</NavLink>
        <NavLink to="/test" >Test匹配</NavLink>
        <NavLink to="/user" >用户</NavLink>
        <NavLink to="/detail/abc" >详情</NavLink>
        <NavLink to="/detail2?name=lau&age=18" >详情2</NavLink>
        <NavLink to={{
            pathname: "/detail3",
            query: { name: "lau", age: 18 },
            state: { height: 1.98, address: '神都' },
            search: "?apikey=123"
        }} >详情3</NavLink>
        <button onClick={jumpToProduct}>商品</button>

        {/* 2. Switch组件的作用：排他操作 */}
        {/* <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/profile" component={Profile} />
          <Route path="/:id" component={User} />
          <Route path="/user" component={User} />
          <Route path="/login" component={Login} />
          <Route path="/product" component={Product} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/detail2" component={Detail2} />
          <Route path="/detail3" component={Detail3} />
          <Route component={NoMatch} />
        </Switch> */}

        { renderRoutes(routes) }
    </div>
  );
};
export default withRouter(App);

