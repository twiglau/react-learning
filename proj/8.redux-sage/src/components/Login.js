import React from 'react';
import {connect} from 'react-redux';
import actions from '../store/actions/user'
class Login extends React.Component {
    constructor(){
        super()
        this.usernameRef = React.createRef()
        this.passwordRef = React.createRef()
    }
    login = ()=>{
        const username = this.usernameRef.current.value;
        const password = this.passwordRef.current.value;
        this.props.login(username, password)
    }
    logout = ()=>{
        this.props.logout()
    }
    render(){
        let loginForm = (
            <>
                <label>用户名:</label><input ref={this.usernameRef}/>
                <label>密码:</label><input ref={this.passwordRef} />
                <button onClick={this.login}>登录</button>
            </>
        )
        let logoutForm = (
            <>
                <label>用户名: </label>{this.props.token}
                <button onClick={this.logout}>退出</button>
            </>
        )
        return (
            this.props.token?logoutForm:loginForm
        )
    }
}

export default connect(
    state=>state.user, // {username: 'lau'}
    actions
)(Login)