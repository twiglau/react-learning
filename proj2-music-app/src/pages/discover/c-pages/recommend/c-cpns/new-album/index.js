import React, { memo, useEffect, useRef } from 'react'
import { getNewAlbumAction } from '../../store/actionCreators'
import ThemeHeaderRCM from '@/components/theme-header-rcm'
import AlbumCover from '@/components/album-cover'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'antd'
import {AlbumWrapper} from './style'
const NewAlbum = memo(() => {
  const pageRef = useRef()

  const { newAlbums } = useSelector(state => ({
    newAlbums: state.getIn(['recommend','newAlbums'])
  }))
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getNewAlbumAction(10))
  }, [dispatch])
  
  return (
    <AlbumWrapper>
        <ThemeHeaderRCM title="新碟上架" />
        <div className='content'>
          <button className='arrow arrow-left sprite_02' onClick={e => pageRef.current.prev()}></button>
          <div className='album'>
            <Carousel dots={false} ref={pageRef}>
              {
                [0,1,2,3,4,5,6,7,8,9].map(item => {
                  return (
                    <div key={item} className='page'>
                      {
                        newAlbums.slice(item*5, (item + 1)*5).map(ele => {
                          return <AlbumCover key={ele.id} 
                                             info={ele} 
                                             size={100} 
                                             width={118} 
                                             bgp="-570px" />
                        })
                      }
                    </div>
                  )
                })
              }
            </Carousel>
          </div>
          <button className='arrow arrow-right sprite_02' onClick={e => pageRef.current.next()}></button>
        </div>
    </AlbumWrapper>
  )
})

export default NewAlbum