'use client';

import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/slider-custome.css';
import {SliderMusicProps} from '@/src/props/slider-props';
import MusicCard from '../music/music-card';

export default function SliderMusic(params: SliderMusicProps) {
	const {slideData, settings, type, className} = params;
	return (
		<div className={`${className}`}>
			<SlickSlider
				{...settings}
				className='slider'
			>
				{slideData.map((music, index) => {
					return (
						<MusicCard
							imageMusic={music.image_music}
							key={music._id}
							musicName={music.name_music}
							mucisId={music._id}
							musicSrc={music.src_music}
							category={music.category}
							singerName={music.name_singer}
							type={type}
							index={index}
							timeFormat={music.time_format}
						/>
					);
				})}
			</SlickSlider>
		</div>
	);
}
