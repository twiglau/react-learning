import styled from "styled-components";

export const AnchorWrapper = styled.div`
  padding: 14px 20px 14px 20px;
  .list {
    .item {
      display:flex;
      width: 210px;
      margin-top: 10px;
      .image {
        img {
          width: 40px;
          height: 40px;
        }
      }
    }
    .info {
      width: 160px;
      margin-left: 8px;
      .name {
        color: #000;
        font-weight: 700;
      }
      .position {
        margin-top: 6px;
        color: #666;
      }
    }
  }
`