import React, { Component } from 'react';
import Local from '../store';
export default class UserAdd extends Component {
    constructor(){
        super()
        this.usernameRef = React.createRef()
        this.emailRef = React.createRef()
    }
    handleSubmit = (event)=>{
        event.preventDefault();
        const username = this.usernameRef.current.value;
        const email = this.emailRef.current.value;
        let user = {id: Date.now(), username, email}
        Local.add(user)

        this.props.history.push('/user/list');
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label className='control-label'>用户名</label>
                    <input className='form-control' ref={this.usernameRef}/>
                </div>
                <div className='form-group'>
                    <label className='control-label'>邮箱</label>
                    <input className='form-control' ref={this.emailRef} />
                </div>
                <div className='form-group'>
                    <button className='btn btn-primary' type='submit'>提交</button>
                </div>
            </form>
        )
    }
}