'use client';

import SliderImage from '@/src/components/slide/slider-image';
import {useContext, useEffect, useState} from 'react';
import {MusicContext, MusicContextType} from '@/src/context/music-context';
import Music from '@/src/components/music/music';
import Link from 'next/link';
import Button from '@/src/components/button/button';
import SliderMusic from '@/src/components/slide/slider-music';
import {settingsSliderImage, settingsSliderMusic} from '@/src/variables/slider-setting';
import {AppContext, AppContextType} from '../context/app-context';
import {postData} from '../helpers/axiosClient';
import {MusicDataProps} from '../props/music-props';
import HistoryCard from '../components/music/history-card';
import '../styles/slider-custome.css';

export default function Home() {
	const musicContext = useContext(MusicContext) as MusicContextType;
	const {trendingMusic, newMusic, favoriteMusic, topViewMusic, slideData} = musicContext;

	const appContext = useContext(AppContext) as AppContextType;
	const {theme, searchValue} = appContext;
	const [resultSearch, setResultSearch] = useState<MusicDataProps[]>([]);

	const handleSearch = async () => {
		if (searchValue !== '') {
			const response = await postData('/api/music/search', {
				searchValue: searchValue,
			});

			if (response.success) {
				setResultSearch(response.data);
			}
		}
	};

	useEffect(() => {
		handleSearch();
	}, [searchValue]);

	return (
		<div
			className='content-wrapper p-4 pb-[200px]'
			data-theme={theme}
		>
			{searchValue === '' ? (
				<>
					<div className='section-wrapper'>
						<h2 className='text-xl uppercase text-[var(--text-primary)] mb-3 font-[600] sec-title'>Hot</h2>
						<SliderImage
							settings={settingsSliderImage}
							slideData={slideData}
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
									className=''
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
				</>
			) : (
				<div className='flex gap-3'>
					<div className='w-[30%]'>
						<h3 className='text-xl p-2 font-semibold text-[var(--text-primary)]'>Kết quả hàng đầu</h3>
						{resultSearch.length > 0 ? (
							<HistoryCard
								key={resultSearch[0]._id}
								imageMusic={resultSearch[0].image_music}
								musicName={resultSearch[0].name_music}
								mucisId={resultSearch[0]._id}
								musicSrc={resultSearch[0].src_music}
								category={resultSearch[0].category}
								singerName={resultSearch[0].name_singer}
								timeFormat={resultSearch[0].time_format}
								index={0}
								type={resultSearch[0].type}
							/>
						) : (
							<div className='p-2'>Không tìm thấy kết quả nào</div>
						)}
					</div>
					<div className='w-[30%]'>
						<h3 className='text-xl p-2 font-semibold'>Bài hát</h3>
						{resultSearch.length > 0 &&
							resultSearch.map((music: MusicDataProps, index: number) => {
								return (
									<Music
										key={music._id}
										imageMusic={music.image_music}
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
							})}
					</div>
				</div>
			)}
		</div>
	);
}
