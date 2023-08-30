import React, { PureComponent } from 'react'
import CommentInput from './components/CommentInput'
import CommentItem from './components/CommentItem'

export default class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
        commentList:[]
    }
  }
  submitComment(info) {
    this.setState({
        commentList: [...this.state.commentList, info]
    })
  }
  render() {
    return (
      <div style={{ width: '500px', padding: '20px'}}>
        <div>评论内容</div>
        {
            this.state.commentList.map(info => <CommentItem comment={info} key={info.id} />)
        }
        <CommentInput submitComment={ e => this.submitComment(e)}  />
      </div>
    )
  }
}
