import React, { PureComponent } from 'react'
import styled from 'styled-components'

const HomeWrapper = styled.div`
  font-size:50px;
  color:red;
  .banner {
    background-color: blue;
    span {
      color: #fff;
      &.active {
        color: #000;
      }
      &:hover {
        color: orange;
      }
    }
  }
`

const TitleWrapper = styled.h2`
  text-decoration: underline;
  font-size: ${ props => props.theme.fontSize };
  color: ${ props => props.theme.themeColor };
`
export default class home extends PureComponent {
  render() {
    return (
      <HomeWrapper>
        <TitleWrapper>我是home的标题</TitleWrapper>
        <div className='banner'>
          <span className='hover'>轮播图1</span>
          <span className='active'>轮播图2</span>
          <span>轮播图3</span>
          <span>轮播图4</span>
        </div>
      </HomeWrapper>
    )
  }
}
