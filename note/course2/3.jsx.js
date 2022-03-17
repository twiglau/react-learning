import React from 'react';
import ReactDOM from 'react-dom';

// jsx 是一个普通 JS 对象, 那么它就可以被用在 if while for 方法的参数 返回值  
let username = 'zhufeng';
function greeting(username){
  if(username){
    return <h1>欢迎{username}</h1>
  }else{
    return <h1>欢迎陌生人</h1>
  }
}

let element = greeting(username)
ReactDOM.render(
element,
document.getElementById('root')
)

