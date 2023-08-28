'use client';

import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slide from './slide-image';
import {SliderImageProps} from '@/src/props/slider-props';
import '../../styles/slider-custome.css';

export default function SliderImage(params: SliderImageProps) {
	const {slideData, settings, className} = params;
	return (
		<div className={`${className}`}>
			<SlickSlider
				{...settings}
				className='slider'
			>
				{slideData.length > 0
					? slideData.map((slide, index) => {
							return (
								<Slide
									image_src={slide.image_src}
									key={index}
									banner_title={slide.banner_title}
								/>
							);
					  })
					: Array(3)
							.fill(0)
							.map((index) => {
								return <Slide.loading key={index} />;
							})}
			</SlickSlider>
		</div>
	);
}
