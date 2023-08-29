
import { Avatar, Comment, Tooltip } from 'antd';
import React  from 'react';
const CommentItem = (props) => {
  const { content, avatar, nickname, datetime } = props.comment
  return (
    <Comment
      author={<a>{nickname}</a>}
      avatar={<Avatar src={avatar} alt={nickname} />}
      content={<p>{content}</p>}
      datetime={
        <Tooltip title={datetime.format("YYYY/MM/DD HH:mm:ss")}>
          <span>{datetime.fromNow()}</span>
        </Tooltip>
      }
    />
  );
};
export default CommentItem;
