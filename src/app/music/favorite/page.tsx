'use client';
import Button from '@/src/components/button/button';
import Music from '@/src/components/music/music';
import {AppContext, AppContextType} from '@/src/context/app-context';
import {getData} from '@/src/helpers/axiosClient';
import {CaretLeftOutlined, ClockCircleOutlined} from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import {useContext, useEffect, useState} from 'react';

export default function FavoritePage(params: any) {
	const appContext = useContext(AppContext) as AppContextType;
	const {theme} = appContext;

	const [playlist, setPlayList] = useState([]);

	useEffect(() => {
		getData('/api/music/favorite?_limit=100', setPlayList);
	}, []);

	return (
		<div
			data-theme={theme}
			className='content-wrapper p-4'
		>
			<div className='detail-top flex gap-4 max-[830px]:flex-col-reverse'>
				<div className='min-w-[232px] min-h-[232px] bg-[var(--text-primary)] flex items-center justify-center rounded-xl'>
					<Image
						className='w-[auto] h-[auto] object-cover'
						src={theme === 'dark' ? '/coconut-album-logo.png' : '/coconut-album-logo-white.png'}
						alt='logo album'
						width={100}
						height={100}
					/>
				</div>
				<div className='flex flex-col'>
					<div className='flex gap-2 items-center '>
						<Button
							rounded
							className='icon'
						>
							<Link href={'/'}>
								<CaretLeftOutlined />
							</Link>
						</Button>
						<span className='py-2 px-4 rounded-lg bg-[var(--text-primary)] text-[var(--background)]'>
							Top Favorite Song
						</span>
					</div>
					<div className='h-full flex flex-col justify-end'>
						<h1 className='page-music-title max-[1024px]:text-[2rem] max-[830px]:py-2'>Bài hát yêu thích hàng đầu</h1>
						<p className='text-[var(--text-secondary)]'>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias obcaecati ipsum voluptate quas aliquid
							voluptas sit earum doloribus, facilis repudiandae maxime corrupti accusamus delectus pariatur nemo
							deleniti fugiat quod aut. voluptas sit earum doloribus, facilis repudiandae maxime corrupti accusamus
							delectus pariatur nemo deleniti fugiat quod aut.
						</p>
					</div>
				</div>
			</div>
			<div className='content pt-[40px] pb-[200px]'>
				<div className='flex border border-b-2 p-3 border-[var(--brown)] bg-[var(--text-primary)] text-[var(--background)] rounded-xl'>
					<div className='w-[40px]'>#</div>
					<div className='w-[30%] max-[830px]:w-[80%]'>Tiêu đề</div>
					<div className='w-[20%] max-[830px]:hidden'>Lượt phát</div>
					<div className='w-[20%] max-[830px]:hidden'>Album</div>
					<div>
						<ClockCircleOutlined />
					</div>
				</div>
				{playlist.length > 0 &&
					playlist.map((music: any, index: number) => {
						return (
							<div
								key={music._id}
								className='data-music flex px-2 text-[var(--text-primary)] rounded-xl items-center hover:bg-[var(--brown-rgba)] transition-all duration-300 ease-linear'
							>
								<div className='w-[40px]'>{index + 1}</div>
								<div className='w-[30%] max-[830px]:w-[80%]'>
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
								</div>
								<div className='w-[20%] max-[830px]:hidden'>999+</div>
								<div className='w-[20%] max-[830px]:hidden'>Coconut Playlist</div>
								<div>{music.time_format}</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}
