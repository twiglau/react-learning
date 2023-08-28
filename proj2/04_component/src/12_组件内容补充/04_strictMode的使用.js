import { PureComponent, StrictMode } from "react";

class Home extends PureComponent {
    
    constructor(props) {
        super(props);
        console.log("Home constructor")
    }
    // StrictMode
    // 1. Warning: componentWillMount has been renamed, and is not recommended for use
    componentWillMount() {
        console.log("home componentWillMount")
    }
    render() {
        return (
            <div ref="title">
                Home
            </div>
        )
    }
}
class Profile extends PureComponent {
    constructor(props) {
        super(props);
        console.log("Profile constructor")
    }

    UNSAFE_componentWillMount() {
        console.log("Profile componentWillMount")
    }
    render() {
        return (
            <div ref="title">
                Profile
            </div>
        )
    }
}
export default class App extends PureComponent {
    render() {
        return (
            <div>
                <StrictMode>
                   <Home />
                </StrictMode>
                <Profile />
            </div>
        )
    }
}