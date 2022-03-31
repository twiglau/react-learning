import React from 'react';
import { Route,Link } from '../react-router-dom';
// 这个菜单相对于 Link 多了一个功能, 如果当前地址栏中的路径和自己匹配的话, 则加一个漂亮的底色
// 在 Route 要想指定渲染的内容有三种方式:
// component render children
// component render 只有在路径匹配的时候才会渲染, 否则不渲染
// children 不管路径 匹配不匹配都会渲染
export default function({to,exact,children}){
    return (
        <Route path={to} exact={exact} children={
           props=>{

               // 在 a 标签上添加类名不起作用
               return <Link className={props.match?'active':''}  to={to}>{children}</Link>
           }
        }/>
    )
}