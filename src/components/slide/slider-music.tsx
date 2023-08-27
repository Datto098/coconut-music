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
		<div
			className={`${className} grid grid-cols-12 gap-2 max-[1600px]:grid-cols-6 max-[840px]:grid-cols-4 max-[540px]:grid-cols-3 max-[420px]:grid-cols-2`}
		>
			{slideData.length > 0
				? slideData.map((music, index) => {
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
				  })
				: Array(12)
						.fill(0)
						.map((item: any, index: number) => {
							return <MusicCard.loading key={index} />;
						})}
			{/* <SlickSlider
				{...settings}
				className='slider'
			>
				{slideData.length > 0
					? slideData.map((music, index) => {
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
					  })
					: Array(12)
							.fill(0)
							.map((item: any, index: number) => {
								return <MusicCard.loading key={index} />;
							})}
			</SlickSlider> */}
		</div>
	);
}
