import React, { memo } from 'react'
import { SongCoverWrapper } from './style'
export default memo(function SongCover(props) {
	const { info } = props
	return (
		<SongCoverWrapper>
			<div className='cover-top'>
				<img src={info.picUrl} alt='' />
				<div className='cover sprite_cover'>
					<div className='info sprite_cover'>
						<span>
							<i className='sprite_icon erji'></i>
							{info.playCount}
						</span>
						<i className='sprite_icon play'></i>
					</div>
				</div>
			</div>
			<div className='cover-bottom text-nowrap'>
				{info.name}
			</div>
			<div className='cover-source text-nowrap'>
				by {info.copywriter || '-'}
			</div>
		</SongCoverWrapper>
	)
})
