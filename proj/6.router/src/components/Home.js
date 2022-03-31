import React, { Component } from 'react';

export default class Home extends Component {
    render(){
        console.log('Home',this.props);
        return (
            <>
                <div>Home</div>
                <div>Home路由携带location-state:</div>
            </>
        )
    }
}