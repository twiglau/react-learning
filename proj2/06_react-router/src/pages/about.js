import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import { renderRoutes, matchRoutes } from 'react-router-config'
export function AboutHistory(props) {
  return <h2>企业成立于2023年</h2>
}
export function AboutCulture(props) {
  return <h2>创新/发展/共赢</h2>
}
export function AboutContact(props) {
  return <h2>电话：020-68800000</h2>
}
export function AboutJoin(props) {
  return <h2>加入我们：twig@gmail.com</h2>
}
export default function About(props) {
  console.log(props.route)
  const branch = matchRoutes(props.route.routes, '/about')
  console.log('branch: ',branch)
  const joinUsClick = ()=> {
    
    // About 是通过路由跳转进来的，可以获取到
    // history, Location, match 对象
    // console.log('join-us', props)
    props.history.push("/about/join")
  }
  return (
    <div>
      <h4>About Page</h4>
      <NavLink exact to="/about" activeClassName="about-active">企业历史</NavLink>
      <NavLink exact to="/about/culture" activeClassName="about-active">企业文化</NavLink>
      <NavLink exact to="/about/contact" activeClassName="about-active">联系我们</NavLink>
      <button onClick={joinUsClick}>加入我们</button>

      {/* <Switch>
          <Route exact path="/about" component={AboutHistory} />
          <Route path="/about/culture" component={AboutCulture} />
          <Route path="/about/contact" component={AboutContact} />
          <Route path="/about/join" component={AboutJoin} />
      </Switch> */}
      { renderRoutes(props.route.routes)}
    </div>
  )
}
