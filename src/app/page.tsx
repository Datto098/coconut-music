'use client';

import SliderImage from '@/src/components/slide/slider-image';
import {sliderData} from '@/src/variables/slider-data';
import {useContext} from 'react';
import {MusicContext, MusicContextType} from '@/src/context/music-context';
import Music from '@/src/components/music/music';
import Link from 'next/link';
import Button from '@/src/components/button/button';
import SliderMusic from '@/src/components/slide/slider-music';
import {settingsSliderImage, settingsSliderMusic} from '@/src/variables/slider-setting';
import {AppContext, AppContextType} from '../context/app-context';
import '../styles/slider-custome.css';

export default function Home() {
	const musicContext = useContext(MusicContext) as MusicContextType;
	const {trendingMusic, newMusic, favoriteMusic, topViewMusic} = musicContext;

	const appContext = useContext(AppContext) as AppContextType;
	const {theme} = appContext;

	return (
		<div
			className='content-wrapper p-4 pb-[200px]'
			data-theme={theme}
		>
			<div className='section-wrapper'>
				<h2 className='text-xl uppercase text-[var(--text-primary)] mb-3 font-[600] sec-title'>Hot</h2>
				<SliderImage
					settings={settingsSliderImage}
					slideData={sliderData}
					className='max-h-[300px] overflow-hidden'
				/>
			</div>
			<div className='section-wrapper'>
				<h2 className='text-xl uppercase text-[var(--text-primary)] mb-3 font-[600] flex items-center justify-between sec-title'>
					Xu Hướng
					<Link
						href='/music/trending'
						className='text-sm font-thin text-[var(--text-secondary)] flex items-center justify-center gap-1'
					>
						Xem tất cả
					</Link>
				</h2>
				<div className=''>
					{trendingMusic && (
						<SliderMusic
							settings={settingsSliderMusic}
							slideData={trendingMusic}
							type='trending'
							className='max-h-[300px] overflow-hidden'
						/>
					)}
				</div>
			</div>
			<div className='section-wrapper'>
				<h2 className='text-xl uppercase text-[var(--text-primary)] mb-3 font-[600] sec-title'>Mới Phát Hành</h2>
				<div className='grid grid-cols-3 gap-2 max-[940px]:grid-cols-2 max-[580px]:grid-cols-1'>
					{newMusic.length > 0
						? newMusic.map((music, index) => {
								return (
									<Music
										imageMusic={music.image_music}
										key={music._id}
										musicName={music.name_music}
										mucisId={music._id}
										musicSrc={music.src_music}
										category={music.category}
										singerName={music.name_singer}
										timeFormat={music.time_format}
										index={index}
										type={music.type}
									/>
								);
						  })
						: Array(12)
								.fill(0)
								.map((item: any, index: number) => {
									return <Music.loading key={index} />;
								})}
				</div>
				<Button
					primary
					onClick={() => {}}
					className='my-4 mx-auto'
				>
					<Link
						href='/music/new-music'
						className='text-sm font-thin flex items-center justify-center gap-1'
					>
						Xem tất cả
					</Link>
				</Button>
			</div>
			<div className='section-wrapper'>
				<h2 className='text-xl uppercase text-[var(--text-primary)] mb-3 font-[600] flex items-center justify-between sec-title'>
					Top yêu thích
					<Link
						href='/music/favorite'
						className='text-sm font-thin text-[var(--text-secondary)] flex items-center justify-center gap-1'
					>
						Xem tất cả
					</Link>
				</h2>
				<div className=''>
					{favoriteMusic && (
						<SliderMusic
							settings={settingsSliderMusic}
							slideData={favoriteMusic}
							type='favorite'
						/>
					)}
				</div>
			</div>
			<div className='section-wrapper'>
				<h2 className='text-xl uppercase text-[var(--text-primary)] mb-3 font-[600] sec-title'>Top view</h2>
				<div className='grid grid-cols-3 gap-2 max-[940px]:grid-cols-2 max-[580px]:grid-cols-1'>
					{topViewMusic.length > 0
						? topViewMusic.map((music, index) => {
								return (
									<Music
										imageMusic={music.image_music}
										key={music._id}
										musicName={music.name_music}
										mucisId={music._id}
										musicSrc={music.src_music}
										category={music.category}
										singerName={music.name_singer}
										timeFormat={music.time_format}
										index={index}
										type={music.type}
									/>
								);
						  })
						: Array(12)
								.fill(0)
								.map((item: any, index: number) => {
									return <Music.loading key={index} />;
								})}
				</div>
				<Button
					primary
					onClick={() => {}}
					className='my-4 mx-auto'
				>
					<Link
						href='/music/top-view'
						className='text-sm font-thin flex items-center justify-center gap-1'
					>
						Xem tất cả
					</Link>
				</Button>
			</div>
		</div>
	);
}
