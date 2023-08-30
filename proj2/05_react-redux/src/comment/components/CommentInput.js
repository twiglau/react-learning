import React, { useState } from 'react'
import { Input, Button } from 'antd'
import moment from 'moment'
export default function CommentInput(props) {
  const { submitComment } = props
  const [content, setContent] = useState('')
  const addComment = ()=> {
    const commentInfo = {
      content,
      id: moment().valueOf(),
      avatar:"http://n.sinaimg.cn/translate/134/w867h867/20181121/gt_8-hnyuqhi6990765.jpg",
      nickname:'lau',
      datetime: moment()
    }
    submitComment(commentInfo)
  }
  return (
    <>
     <Input.TextArea 
       tows={4} 
       placeholder="请输入内容..." 
       value={content} 
       onChange={e => {
          setContent(e.target.value)
      }}/>
     <Button type='primary' onClick={addComment}>添加评论</Button>
    </>
  )
}
