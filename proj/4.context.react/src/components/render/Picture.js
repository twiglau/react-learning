import React, { Component } from 'react';
import MouseTracer from './MouseTracker'
// 2. 
{/* <MouseTracer>
    {
      (props)=><Picture {...props} />
    }
</MouseTracer> */}
// 2.1
/* <MouseTracer render={(param)=><Picture {...param}/>} /> */

function withMouseTracker(Comp){
    return props=><MouseTracer render={(param)=><Comp {...props} {...param} />} />
}

class Picture extends Component {
    constructor(){
        super()
    }
    render() {
        return (
            <>
                <img src="http://localhost:3000/logo512.png"/>
                <p>请移动鼠标</p>
                <p>
                    当前鼠标的位置是
                    x: {this.props.x}
                    y: {this.props.y}
                </p>
            </>
        )
    }
}

export default withMouseTracker(Picture);