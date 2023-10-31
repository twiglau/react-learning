import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { ThemeHeaderRCMWrapper } from './style'
const ThemeHeaderRCM = memo((props) => {
  const { title, keywords } = props
  return (
    <ThemeHeaderRCMWrapper className='sprite_02'>
        <div className='left'>
            <h3 className='title'>{title}</h3>
            <div className='keyword'>
                {
                    keywords.map(ele => {
                        return (
                            <div className='item' key={ele}>
                                <a href='todo'>{ele}</a>
                                <span className='divider'>|</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <div className='right'>
            <a href='todo'>更多</a>
            <i className='icon sprite_02'></i>
        </div>
    </ThemeHeaderRCMWrapper>
  )
})

// TODO: 对组件props校验
ThemeHeaderRCM.propTypes = {
    title: PropTypes.string.isRequired,
    keywords: PropTypes.array
}
ThemeHeaderRCM.defaultProps = {
    keywords:[]
}
export default ThemeHeaderRCM