import React, { PureComponent } from 'react'
import classNames from 'classnames'
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true
    }
  }
  render() {
    const { isActive } = this.state;
    return (
      <div>
        {/*原生React中添加class方法 */}
        <h2 className={'foo bar active title'}>我是标题1</h2>
        <h2 className={ 'title ' + (isActive ? "active":"")}>我是标题2</h2>
        <h2 className={['title', (isActive ? "active": "")].join(" ")}>我是标题3</h2>

        {/* classnames库添加class */}
        <h2 className={classNames("foo", "bar", "active", "title")}>我是标题4</h2>
        <h2 className={classNames("foo", {"bax":false, "active": isActive})}>我是标题5</h2>
        <h2>我是标题6</h2>
        <h2>我是标题7</h2>
      </div>
    )
  }
}

