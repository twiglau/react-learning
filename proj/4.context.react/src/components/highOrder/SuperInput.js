import React, { Component } from "react";
import WithLocal from './WithLocal'
import WithAjax from './WithAjax'
class UserNameInput extends Component {
    
    render() {
        return (
            <input defaultValue={this.props.value} />
        )
    }
}

// 高阶组件的多层嵌套也是 hooks 解决的问题之一
let UserNameInputWithAjax = WithAjax(UserNameInput, 'username');
let UserNameInputWithLocal = WithLocal(UserNameInputWithAjax, 'username');
export default UserNameInputWithLocal