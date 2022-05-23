import React, { PureComponent } from 'react'

function withAuth(WrappedComponent){
    return props => {
        const { isLogin } = props;
        if(isLogin){
            return <WrappedComponent {...props} />
        }else{
            return <LoginPage />
        }
    }
}
class LoginPage extends PureComponent {
    render(){
        return <h2>登录</h2>
    }
}
class CartPage extends PureComponent {
    render(){
        return <h2>Cart Page</h2>
    }
}
const AuthPage = withAuth(CartPage)
export default class App extends PureComponent {
  render() {
    return (
      <div>
        <AuthPage isLogin = { true } />
      </div>
    )
  }
}
