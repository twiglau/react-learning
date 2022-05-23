import React, { createRef, PureComponent, forwardRef } from 'react'

class Home extends PureComponent {
    render() {
        return <h2>Home</h2>
    }
}

// 高阶组件
const Profile = forwardRef(function (props, ref) {
    return <h2 ref={ref}>Profile</h2>
})


export default class App extends PureComponent {

    titleRef = createRef()
    homeRef = createRef()
    profileRef = createRef()
    render() {
        return (
            <div>
                <h2 ref={this.titleRef}>Hello world</h2>
                <Home ref={this.homeRef} />
                <Profile ref={this.profileRef} />
                <button onClick={e => this.printRef()}>打印Ref</button>
            </div>
        )
    }
    printRef() {
        console.log(this.titleRef.current);
        console.log(this.homeRef.current);
        console.log(this.profileRef.current);

    }
}
