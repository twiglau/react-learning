import React, { memo } from 'react'
import classNames from 'classnames'
import { headerLinks } from '@/common/local-data'
import { NavLink } from 'react-router-dom'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { 
    HeaderWrapper,
    HeaderLeft,
    HeaderRight
} from './style';
const appHeader = memo(() => {
  const showSelectItem = (item,index) => {
    if(index<3) {
        return (
            <NavLink to={item.link} exact>
                {item.title}
                <i className='sprite_01 icon'></i>
            </NavLink>
        )
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
                                <div 
                                className={classNames('select-item',{'last-item':index === 5})} 
                                key={item.title}>
                                    {showSelectItem(item,index)}
                                </div>
                            )
                        })
                    }
                </div>
            </HeaderLeft>
            <HeaderRight>
                <Input className='search' prefix={<SearchOutlined />} placeholder='音乐/视频/电台/用户' />
                <button className="center">创作者中心</button>
                <button>登录</button>
            </HeaderRight>
        </div>
        <div className='divider'></div>
    </HeaderWrapper>
  )
})

export default appHeader