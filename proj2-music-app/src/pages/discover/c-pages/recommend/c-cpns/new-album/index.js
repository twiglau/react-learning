import React, { memo, useEffect, useMemo, useRef } from 'react'
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

  
  const pageArrays = useMemo(()=> {
    // 每页5条数据
    let temps = (newAlbums || []).reduce((prev,curr) => {
      const len = prev.length
      let sub = prev[len - 1] // 取最后一个判断
      if(len && sub.length < 5) {
        prev[len - 1].push(curr)
      } else {
        prev.push([curr])
      }
      return prev
   }, [])
   return temps
  }, [newAlbums])
  return (
    <AlbumWrapper>
        <ThemeHeaderRCM title="新碟上架" />
        <div className='content'>
          <button className='arrow arrow-left sprite_02' onClick={e => pageRef.current.prev()}></button>
          <div className='album'>
            <Carousel dots={false} ref={pageRef}>
              {
                pageArrays.map((item,index) => {
                  return (
                    <div key={index} className='page'>
                      {
                        item.map(ele => {
                          return <AlbumCover key={ele.id}
                                             info={ele}
                                             size={100}
                                             width={118}
                                             bgp="-570px"/>
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