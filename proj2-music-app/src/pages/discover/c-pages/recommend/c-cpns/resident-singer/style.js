import styled from "styled-components";

export const ResidentWrapper = styled.div`
  padding: 14px 20px 14px 20px;
  .list {
    display: flex;
    flex-direction: column;
  }
  .item {
    margin-top: 15px;
    background: #fafafa;
    border: solid 1px #eee;
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
        width: 62px;
        height: 62px;
    }
    .info {
        flex: 1;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        color: #333;
        font-size: 13px;
        span:last-child {
            font-size: 12px;
            margin-top: 12px;
            color: #666;
            overflow: hidden;
            width: 80%;
        }
    }
    &:hover {
        background: #f1f1f1;
    }
  }
  .apply-for {
    margin-top: 12px;
    a {
        color: #333;
        font-weight: 700;
        text-align: center;
        display: block;
        line-height: 31px;
        height: 31px;
        border-radius: 4px;
        background-color: #fafafa;
        border: solid 1px #c3c3c3;
        text-decoration: none;
    }
  }
`