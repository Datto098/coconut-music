'use client';

import SliderImage from '@/components/slide/slider-image';
import '../styles/slider-custome.css';
import {sliderData} from '@/variables/slider-data';
import {useContext} from 'react';
import {MusicContext, MusicContextType} from '@/context/music-context';
import Music from '@/components/music/music';
import Link from 'next/link';
import {CaretRightOutlined} from '@ant-design/icons';
import Button from '@/components/button/button';
import SliderMusic from '@/components/slide/slider-music';
import {settingsSliderImage, settingsSliderMusic} from '@/variables/slider-setting';
import LoginForm from '@/components/form/login';
import SignUpForm from '@/components/form/signUp';

export default function Home() {
	const musicContext = useContext(MusicContext) as MusicContextType;
	const {trendingMusic, newMusic, favoriteMusic, topViewMusic} = musicContext;

	return (
		<>
			<div className='content-wrapper p-4'>
				<div className='section-wrapper'>
					<h3 className='text-xl uppercase text-[var(--text-primary)] mb-3 font-[600] sec-title'>Hot</h3>
					<SliderImage
						settings={settingsSliderImage}
						slideData={sliderData}
						className='max-h-[300px] overflow-hidden'
					/>
				</div>
				<div className='section-wrapper'>
					<h3 className='text-xl uppercase text-[var(--text-primary)] mb-3 font-[600] flex items-center justify-between sec-title'>
						Xu Hướng
						<Link
							href='/trending'
							className='text-sm font-thin capitalize text-[var(--text-secondary)] flex items-center justify-center gap-1'
						>
							Xem tất cả
						</Link>
					</h3>
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
					<h3 className='text-xl uppercase text-[var(--text-primary)] mb-3 font-[600] sec-title'>Mới Phát Hành</h3>
					<div className='grid grid-cols-3 gap-2 max-[940px]:grid-cols-2 max-[480px]:grid-cols-1'>
						{newMusic &&
							newMusic.map((music, index) => {
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
										type='new-music'
									/>
								);
							})}
					</div>
					<Button
						primary
						onClick={() => {}}
						className='my-4 mx-auto'
					>
						Xem tất cả
					</Button>
				</div>
				<div className='section-wrapper'>
					<h3 className='text-xl uppercase text-[var(--text-primary)] mb-3 font-[600] flex items-center justify-between sec-title'>
						Top yêu thích
						<Link
							href='/trending'
							className='text-sm font-thin capitalize text-[var(--text-secondary)] flex items-center justify-center gap-1'
						>
							Xem tất cả
						</Link>
					</h3>
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
					<h3 className='text-xl uppercase text-[var(--text-primary)] mb-3 font-[600] sec-title'>Top view</h3>
					<div className='grid grid-cols-3 gap-2 max-[940px]:grid-cols-2 max-[480px]:grid-cols-1'>
						{topViewMusic &&
							topViewMusic.map((music, index) => {
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
										type='top-view'
									/>
								);
							})}
					</div>
					<Button
						primary
						onClick={() => {}}
						className='my-4 mx-auto'
					>
						Xem tất cả
					</Button>
				</div>
			</div>
			<LoginForm />
			<SignUpForm />
		</>
	);
}
