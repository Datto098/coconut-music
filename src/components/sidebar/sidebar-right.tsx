'use client';
import {useContext, useEffect} from 'react';
import {MusicContext, MusicContextType} from '@/src/context/music-context';
import {AppContext, AppContextType} from '@/src/context/app-context';
import Music from '../music/music';
import '../../styles/sidebar.css';

export default function SidebarRight(params: any) {
	const mucisContext = useContext(MusicContext) as MusicContextType;
	const {playlist} = mucisContext;
	const appContext = useContext(AppContext) as AppContextType;
	const {isActivePlaylist, theme} = appContext;

	return (
		<div
			data-theme={theme}
			className={`sidebar-right max-[1240px]:absolute max-[1240px]:top-0 max-[1240px]:right-0 max-[1240px]:bottom-0 max-[1240px]:z-10 ${
				isActivePlaylist ? 'min-w-[350px] max-[1240px]:min-w-[100%] ml-3' : 'ml-0 min-w-[0]'
			}`}
		>
			<div className='sidebar-title'>
				<h3 className='text-center py-2 px-5 rounded-lg mb-4 mt-2 bg-[var(--light-gray)] m-auto w-fit text-[var(--text-primary)]'>
					Danh sách phát
				</h3>
			</div>
			<div className='play-list w-[350px] max-[1240px]:w-[100%]'>
				{playlist &&
					playlist.map((music, index) => {
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
					})}
			</div>
		</div>
	);
}
