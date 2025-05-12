import React from "react";

const FooContext = React.createContext({});

export default class Parent extends React.Component {

  render(): React.ReactNode {
      return (
         <FooContext value="bar">
          <Child />
         </FooContext>
      )
  }
}

class Child extends React.Component {
  static contextType = FooContext;

  render(): React.ReactNode {
      return <div>{this.context}</div>;
  }
}