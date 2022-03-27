
import React from './react';
import ReactDOM from './react-dom';

/**
 * 
let element = (
  <h1 className='title' style={{color:'red',fontSize:'50px'}}>
    hello<span>world</span>
  </h1>
)
 */

/**
let element = React.createElement("h1", {
  className: "title",
  style: {
    color: 'red',
    fontSize: '50px'
  }
}, "hello",React.createElement("span", null, "world"));
 * 
 */
function Welcome(props){
  return <h1 id='welcome'>hello {props.name} {props.age}</h1>
}
class Welcome1 extends React.Component {
  render(){
    return React.createElement('h1',{id: 'classWelcome'}, this.props.name,this.props.age)
  }
}
let element = React.createElement(Welcome1,{name:'lau twig',age:32})
ReactDOM.render(element,document.getElementById('root'));



