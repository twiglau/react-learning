import React, { Component } from 'react'
import WithLogger from './WithLogger';
class Counter extends Component {
    render() {
        return (
            <div>
                {this.props.name}
                Counter
            </div>
        )
    }
}

export default WithLogger(Counter);