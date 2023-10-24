import React, { memo } from 'react'
import {
  DiscoverWrapper,
  TopMenu
} from './style'
import { dicoverMenu } from '@/common/local-data'
import { NavLink } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
const Discover = memo((props) => {
  const { route } = props
  return (
    <DiscoverWrapper>
      <div className='top'>
        <TopMenu className='wrap-v1'>
          { 
            dicoverMenu.map(ele => (
              <div className='item' key={ele.title}>
                <NavLink  to={ele.link}>{ele.title}</NavLink>
              </div>
            ))
          }
        </TopMenu>
      </div>
      {renderRoutes(route.routes)}
    </DiscoverWrapper>
  )
})

export default Discover