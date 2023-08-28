import React, { PureComponent } from 'react'
import profileStyle from './profile.module.css';
export default class profile extends PureComponent {
  render() {
    return (
        <div className='profile'>
          <h2 className={profileStyle.title}>我是profile的标题</h2>
          <div className={profileStyle.setting}>
              <li>setting 1</li>
              <li>setting 2</li>
              <li>setting 3</li>
          </div>
        </div>
    )
  }
}
