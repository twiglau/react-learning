import React, { PureComponent } from 'react'
import { EventEmitter } from 'events';
// 事件总线 event Bus

const eventBus = new EventEmitter();
class Home extends PureComponent {
    render(){
        return (
            <div>
                Home
            </div>
        )
    }
    componentDidMount(){
        eventBus.addListener('ProfileClick',this.handleListener)
    }
    componentWillUnmount(){
        eventBus.removeListener('ProfileClick',this.handleListener)
    }
    handleListener(...args){
        console.log(args)
    }
}
class Profile extends PureComponent {

    render(){
        return (
            <div>
                Profile
                <button onClick={e=>this.emitEvent()}>点击Profile按钮</button>
            </div>
        )
    }
    emitEvent(){
        eventBus.emit('ProfileClick','Hello Home from Profile','123')
    }
}
export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Home />
        <Profile />
      </div>
    )
  }
}
