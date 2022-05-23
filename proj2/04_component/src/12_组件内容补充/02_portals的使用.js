import React, { PureComponent } from 'react'
import ReactDOM  from 'react-dom'

class Model extends PureComponent {
    render(){
        return ReactDOM.createPortal(
            this.props.children,
            document.getElementById("model")
        )
    }
}
class Home extends PureComponent {
    render(){
        return (
            <div>
                <h2>Home</h2>
                <Model>
                    <h2>Title</h2>
                </Model>
            </div>
        )
    }
}
export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Home />
      </div>
    )
  }
}
