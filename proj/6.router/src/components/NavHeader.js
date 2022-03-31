import React, { Component } from 'react';
import { withRouter } from '../react-router-dom';
class NavHeader extends Component {
    render(){
        return (
            <div className='navbar-heading'>
                <a onClick={()=>this.props.history.push('/')} className='navbar-brand'>twig</a>
            </div>
        )
    }
}

export default withRouter(NavHeader);