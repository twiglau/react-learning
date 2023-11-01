import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getResidentSingerAction } from '../../store/actionCreators'
import ThemeHeaderSmall from '@/components/theme-header-small'
import { ResidentWrapper } from './style'
const ResidentSinger = memo(() => {
  const { residents } = useSelector(state => ({
    residents: state.getIn(['recommend', 'residentSinger'])
  }), shallowEqual)
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getResidentSingerAction())
  }, [dispatch])
  return (
    <ResidentWrapper>
      <ThemeHeaderSmall title="入驻歌手" more="查看全部 &gt;"></ThemeHeaderSmall>
      <div className='list'>
        {
          residents.map(item =>  {
            return <div className='item' key={item.id}>
              <img src={item.picUrl} />
              <div className='info'>
                <span>{item.name}</span>
                <span className='text-nowrap'>{item.alias.join(' ') || 'test'}</span>
              </div>
            </div>
          })

        }
      </div>
      <div className='apply-for'>
        <a href='/todo'>申请称为音乐人</a>
      </div>
    </ResidentWrapper>
  )
})

export default ResidentSinger