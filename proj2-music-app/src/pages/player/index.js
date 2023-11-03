import React, { memo } from 'react'

import {
  PlayerWrapper,
  PlayerLeft,
  PlayerRight
} from './style'
const Player = memo(() => {
  return (
    <PlayerWrapper>
      <div className='content wrap-v2'>
        <PlayerLeft>
        </PlayerLeft>
        <PlayerRight>2</PlayerRight>
      </div>
    </PlayerWrapper>
  )
})

export default Player