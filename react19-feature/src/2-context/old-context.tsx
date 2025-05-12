import PropTypes from 'prop-types';
import React from 'react';

export default class Parent extends React.Component {
  static childContextTypes = {
    foo: PropTypes.string.isRequired
  };

  getChildContext() {
    return { foo: 'bar' }
  }

  render(): React.ReactNode {
      return <Child />
  }
}

class Child extends React.Component {
  static contextTypes = {
    foo: PropTypes.string.isRequired
  }

  render() {
    return <div>{ this.context.foo }</div>
  }
}