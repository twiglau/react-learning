import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class Counter extends React.Component {
  constructor(props){
    super(props)
    this.state = { number: 0}
  }
  add() {
    this.setState({ number:this.state.number + 1})
    console.log(this.state) // 0
    this.setState({ number:this.state.number + 1})
    console.log(this.state) // 0
    setTimeout(()=>{
      this.setState({ number:this.state.number + 1})
      console.log(this.state) // 2
      this.setState({ number:this.state.number + 1})
      console.log(this.state) // 3
    },1000)
  }
  render() {
    return <button onClick={this.add.bind(this)}>${this.state.number}</button>
  }
}
ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
