import React, { Component, PureComponent } from 'react'

 class App extends Component {
  render() {
    return (
      <div>
        App: { this.props.name}
      </div>
    )
  }
}

App.displayName = 'test';

function enhanceComponent(WrappedComponent){
    class NewComponent extends PureComponent {
        render(){
            return <WrappedComponent {...this.props} />
        }
    }
    NewComponent.displayName = 'twig'
    return NewComponent;

}
export default enhanceComponent(App);
