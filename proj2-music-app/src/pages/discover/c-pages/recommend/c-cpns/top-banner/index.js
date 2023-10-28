import React, { memo, useCallback, useEffect, useRef,useState,useMemo } from 'react'
import { Carousel } from 'antd'
import {BannerWrapper,BannerLeft,BannerRight,BannerControl} from './style'

import { getTopBannerAction } from '../../store/actionCreators'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
export default memo(function TopBanner() {

	const [currentIndex, setCurrentIndex] = useState(0)
	//TODO: https://blog.cjw.design/blog/frontend/react-redux
	const {topBanners} = useSelector(state => ({
			//TODO 3. 改进 取值修改
			// topBanners: state.recommend.get("topBanners")

			// TODO 5. 改进 state 合并
			// topBanners: state.get("recommend").get("topBanners")
			// 等价写法 =>
			topBanners: state.getIn(["recommend", "topBanners"])
			
			// topBanners: state.recommend.topBanners
	}), shallowEqual)

	const dispatch = useDispatch()
  const bannerRef = useRef()

	useEffect(()=> {
			dispatch(getTopBannerAction())
	},[dispatch])

	const bannerChange = useCallback((from, to) => {
    setTimeout(() => {
      setCurrentIndex(to);
    }, 0);
  }, []);

	let bgImage = useMemo(()=> {
		return topBanners[currentIndex] && (topBanners[currentIndex].imageUrl + "?imageView&blur=40x20")
	}, [topBanners, currentIndex])
	return (
		<BannerWrapper bgImage={bgImage}>
			<div className='banner wrap-v2'>
			<BannerLeft>
				<Carousel ref={bannerRef} effect="fade" autoplay beforeChange={bannerChange}>
				{
					topBanners.map((item, index) => {
						return (
							<div className="banner-item" key={item.imageUrl}>
								<img className="image" src={item.imageUrl} alt={item.typeTitle} />
							</div>
						)
					})
				}
				</Carousel>
			</BannerLeft>
			<BannerRight></BannerRight>
			<BannerControl>
				<button className='btn right' onClick={e => bannerRef.current.next()}></button>
				<button className='btn left' onClick={e => bannerRef.current.prev()}></button>
			</BannerControl>
			</div>
			
		</BannerWrapper>
	)
})
