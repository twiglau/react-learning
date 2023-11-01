import React, { memo } from 'react'
import { Slider } from 'antd'
import { 
    PlayerBarWrapper,
    Control,
    PlayInfo,
    Operator
} from './style'
const AppPlayerBar = memo(() => {
  return (
    <PlayerBarWrapper className='sprite_playbar'>
        <div className='content wrap-v2'>
            <Control>
                <button className='sprite_playbar prev'></button>
                <button className='sprite_playbar play'></button>
                <button className='sprite_playbar next'></button>
            </Control>
            <PlayInfo>
                <div className='image'>
                    <a href='/#'>
                        <img src='' alt='' />
                    </a>
                </div>
                <div className='info'>
                    <div className='song'>
                        <span className='song-name'>热河</span>
                        <a className='singer-name' href='/#'>李志</a>
                    </div>
                    <div className='progress'>
                        <Slider  defaultValue={30}/>
                        <div className='time'>
                            <span className='now-time'>1:30</span>
                            <span className='divider'>/</span>
                            <span>3:20</span>
                        </div>
                    </div>
                </div>
            </PlayInfo>
            <Operator>
                <div className='left'>
                    <button className='sprite_playbar btn favor'></button>
                    <button className='sprite_playbar btn share'></button>
                </div>
                <div className='right sprite_playbar'>
                    <button className='sprite_playbar btn volume'></button>
                    <button className='sprite_playbar btn loop'></button>
                    <button className='sprite_playbar btn playlist'></button>
                </div>
            </Operator>
        </div>
    </PlayerBarWrapper>
  )
})

export default AppPlayerBar