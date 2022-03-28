import React, { Component } from 'react';

/**
 * 重写 PureComponent 组件
 */
export default class PureComponent extends Component {
    isPureComponent = true
    // 传入新的属性对象和状态对象, 然后返回一个是否需要更新的 boolean 值
    shouldComponentUpdate(nextProps, nextState){
        return !shadowEqual(this.props,nextProps) || !shadowEqual(this.state, nextState);
    }
}
// 浅比较, 比较 obj1 和 obj2 是否相等
function shadowEqual(obj1, obj2) {
    if(obj1 === obj2) { // null === null
        return true;
    }
    if(typeof obj1 != 'object' || 
       obj1 === null ||
       typeof obj2 != 'object' ||
       obj2 === null
    ){
        return false;
    }
    let key1 = Object.keys(obj1);
    let key2 = Object.keys(obj2);
    if(key1.length != key2.length){
        return false;
    }
    for(let key of key1) {
        // 1. 前比较
        if(!obj2.hasOwnProperty(key) || obj1[key] != obj2[key]){
            return false
        }
        //// 2. 深比较
        // if(obj2.hasOwnProperty(key)){
        //     if(obj1[key] != obj2[key]){
        //         if(typeof obj1[key] == 'object' && typeof obj2[key] == 'object'){
        //             return shadowEqual(obj1[key],obj2[key]);
        //         }
        //     }
        // }else{
        //     return false;
        // }
    }
    return true;
}

let obj1 = {attr:{name: 'lau'}};
let obj2 = {attr:{name: 'lau'}};
console.log(shadowEqual(obj1,obj2)); // false