import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
class Counter2 extends React.Component {
  state = {number: 0}
  componentDidMount(){
    document.title = `你现在一共点击了${this.state.number}次`;
  }
  componentDidUpdate(){
    document.title = `你现在一共点击了${this.state.number}次`;
  }
  render(){
    return (
      <>
      <p>{this.state.number}</p>
      <button onClick={()=>this.setState({number: this.state.number + 1})}>+</button>
      </>
    )
  }
}
// 每次修改完成状态后要同步到浏览器的标题上
function Counter(){
  const [number, setNumber] = useState(0)
  // effect函数是在每次渲染完成之后调用
  useEffect(()=>{
    document.title = `你现在一共点击了${number}次`;
  })
  return (
    <>
      <p>{number}</p>
      <button onClick={()=>setNumber(number+1)}>+</button>
    </>
  )
}

function Counter3(){
  const [number, setNumber] = useState(0)
  console.log('定时器重新创建了吗?')
  // effect函数是在每次渲染完成之后调用
  useEffect(()=>{
    console.log('你开启了一个新的定时器');
    const $timer = setInterval(()=>{
      setNumber(number => number+1);
    },1000);
    // return ()=>{
    //   clearInterval($timer);
    // }
  },[])
  return (
    <>
      <p>{number}</p>
      <button onClick={()=>setNumber(number+1)}>+</button>
    </>
  )
}
ReactDOM.render(
  <Counter3 />,
  document.getElementById('root')
);

