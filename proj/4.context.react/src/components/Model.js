import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./model.css";
class Model extends Component {
    constructor(){
        super();
    }
    render(){
        return ReactDOM.createPortal(this.props.children,document.getElementById('model-root'))
    }
}


export default  class Page extends Component {
    constructor(){
        super()
        this.state = { showModel: false}
    }
    toggleModel=()=>{
        this.setState({
            showModel: !this.state.showModel
        })
    }
    render(){
        return (
            <div>
                <button onClick={this.toggleModel}>显示/关闭模态容器</button>
                {
                    this.state.showModel&&(
                        <Model>
                            <div id="model" className="model" onClick={this.toggleModel}>
                                <div id="content" className="content">
                                    主要内容
                                </div>
                            </div>
                        </Model>
                    )
                }
            </div>
        )
    }
}