'use client';
import HistoryCard from '@/src/components/music/history-card';
import {UserContext, UserContextType} from '@/src/context/user-context';
import {getData} from '@/src/helpers/axiosClient';
import {useContext, useEffect, useState} from 'react';
import '../../styles/home.css';
import {AppContext, AppContextType} from '@/src/context/app-context';
export default function HistoryPage(params: any) {
	const [favorite, setFavorite] = useState([]);
	const userContext = useContext(UserContext) as UserContextType;
	const {user} = userContext;

	const appContext = useContext(AppContext) as AppContextType;
	const {theme} = appContext;

	useEffect(() => {
		if (user.userId !== '') {
			getData(`/api/music/my-favorite?user_id=${user.userId}`, setFavorite);
		}
	}, [user]);

	return (
		<div
			className='content-wrapper p-4'
			data-theme={theme}
		>
			<h1 className='text-center text-[var(--text-primary)] text-[20px] font-[500] mb-4 p-4  bg-[var(--light-gray)] rounded-xl page-title m-auto'>
				Danh sách nhạc yêu thích
			</h1>
			<div className='grid grid-cols-4 gap-3 max-[940px]:grid-cols-3 max-[840px]:grid-cols-2 max-[640px]:grid-cols-1'>
				{favorite.length > 0
					? favorite.map((music: any, index: number) => {
							return (
								<HistoryCard
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
					  })
					: 'empty'}
			</div>
		</div>
	);
}
