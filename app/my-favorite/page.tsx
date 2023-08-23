'use client';
import HistoryCard from '@/components/music/history-card';
import {UserContext, UserContextType} from '@/context/user-context';
import {getData} from '@/helpers/axiosClient';
import {useContext, useEffect, useState} from 'react';
import '../../styles/home.css';
export default function HistoryPage(params: any) {
	const [favorite, setFavorite] = useState([]);
	const userContext = useContext(UserContext) as UserContextType;
	const {user} = userContext;

	useEffect(() => {
		if (user.userId !== '') {
			getData(`/api/music/my-favorite?user_id=${user.userId}`, setFavorite);
		}
	}, [user]);

	return (
		<div className='content-wrapper p-4'>
			<h1 className='text-center text-[20px] font-[500] mb-4 p-4  bg-[var(--light-gray)] rounded-xl page-title m-auto'>
				Danh sách nhạc yêu thích
			</h1>
			<div className='grid grid-cols-4 gap-3'>
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
