import React, { memo } from 'react'
import classNames from 'classnames'
import { headerLinks } from '@/common/local-data'
import { NavLink } from 'react-router-dom'
import { 
    HeaderWrapper,
    HeaderLeft,
    HeaderRight
} from './style';
const appHeader = memo(() => {
  const showSelectItem = (item,index) => {
    if(index<3) {
        return <NavLink to={item.link}>{item.title}</NavLink>
    } else {
        return <a href={item.link}>{item.title}</a>
    }
  }
  return (
    <HeaderWrapper>
        <div className='content wrap-v1'>
            <HeaderLeft>
                <a className='logo sprite_01'></a>
                <div className='select-list'>
                    {
                        headerLinks.map((item, index) => {
                            return (
                                <div className={classNames('select-item',{'last-item':index === 5})} key={item.title}>{showSelectItem(item,index)}</div>
                            )
                        })
                    }
                </div>
            </HeaderLeft>
            <HeaderRight></HeaderRight>
        </div>
        <div className='divider'></div>
    </HeaderWrapper>
  )
})

export default appHeader