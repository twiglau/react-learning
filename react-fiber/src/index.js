import React from 'react';
import ReactDOM from 'react-dom';

class Ding extends React.Component {
  state = {
    ding: 999
  }
  handleClick = ()=>{

  }
  render(){
    return (
      <div onClick={this.handleClick}>
        <h1 color='#11'>h1</h1>
        <h2>
          h2
          <p>p</p>
        </h2>
        <h3>
          <span></span>
        </h3>
      </div>
    )
  }
}

ReactDOM.render(
  <Ding prop1={666} key="ding" />,
  document.getElementById('root')
)
