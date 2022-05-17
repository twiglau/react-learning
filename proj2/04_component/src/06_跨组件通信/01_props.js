import React, { Component } from 'react'

function ProfileHeader(props){
    return (
        <div>
            <h2>用户昵称: {props.nickname}</h2>
            <h2>用户等级: {props.level}</h2>
        </div>
    )
}
function Profile(props){
    return (
        <div>
            {/* <ProfileHeader nickname={props.nickname} level={props.level} /> */}
            <ProfileHeader {...props}/>
            <ul>
                <ul>设置1</ul>
                <ul>设置2</ul>
                <ul>设置3</ul>
                <ul>设置4</ul>
            </ul>
        </div>
    )
}
export default class App extends Component {
  state = {
      nickname: 'coderwhy',
      level: 99
  }
  render() {
    return (
      <div>
        <Profile {...this.state} />
      </div>
    )
  }
}
