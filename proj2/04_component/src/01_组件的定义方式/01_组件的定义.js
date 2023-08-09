import React, { Component } from "react";

// export default class App extends Component {
//   render() {
//     return (
//       <div>
//         <span>我是App组件</span>
//         {/*alt + shift + f: 对代码进行格式化 */}
//         <h2>{}</h2>
//       </div>
//     );
//   }
// }

/**
 * 函数式组件的特点:
 * 1. 没有 this 对象
 * 2. 没有内部的状态(hooks)
 */
export default function App(){
    return (
        <div>app 组件</div>
    )
}
