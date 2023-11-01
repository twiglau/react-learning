import styled from 'styled-components'

export const UserLoginWrapper = styled.div`
  background-position: 0 0;
  height: 126px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .desc {
    line-height: 25px;
    font-size: 12px;
    color: #666;
  }
  a {
    margin-top: 10px;
    display: inline-block;
    width: 100px;
    height: 31px;
    line-height: 31px;
    text-align: center;
    color: #fff;
    text-decoration: none;
    text-shadow: 0 1px 0 #8a060b;
    background-position: 0 -195px;
  }
  &:hover {
    a {
        background-position: -110px -195px;
    }
  }
`