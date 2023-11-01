import React, { memo, useEffect } from 'react'
import { hotRadios } from '@/common/local-data'
import ThemeHeaderSmall from '@/components/theme-header-small'                                        
import { AnchorWrapper } from './style'
const PopularAnchor = memo(() => {
  return (
    <AnchorWrapper>
      <ThemeHeaderSmall title="热门主播"></ThemeHeaderSmall>
      <div className='list'>
        {
          hotRadios.map(item => {
            return (
              <div className='item' key={item.picUrl}>
                <a href='/todo' className='image'>
                  <img src={item.imgUrl} alt='' />
                </a>
                <div className='info'>
                  <div className='name'>{item.name}</div>
                  <div className='position text-nowrap'>{item.position}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </AnchorWrapper>
  )
})

export default PopularAnchor