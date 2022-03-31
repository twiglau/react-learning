import React from 'react';
import RouterContext from './context';
import pathToRegexp from 'path-to-regexp';
export default class Switch extends React.Component {
    static contextType = RouterContext
    render(){
        const children = Array.isArray(this.props.children)?this.props.children:[this.props.children];
        const {pathname} = this.context.location; // 当前地址栏中的路径
        for(let i=0;i<children.length;i++){
            const child = children[i];
            const {path='/', component:Component, exact=false } = child.props;
            let paramNames = [];
            let regexp = pathToRegexp(path, paramNames, {end: exact});
            let result = pathname.match(regexp);
            if(result){
                return child; // a 组件类型  b 组件的实例  c 虚拟DOM  d React元素
            }
        }
        return null;
    }
}