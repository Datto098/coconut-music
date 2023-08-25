import {HeartOutlined, MoreOutlined, PlayCircleOutlined} from '@ant-design/icons';
import {MusicProps} from '@/src/props/music-props';
import Image from 'next/image';
import '../../styles/music.css';
import {useContext} from 'react';
import {MusicContext, MusicContextType} from '@/src/context/music-context';
import {AppContext, AppContextType} from '@/src/context/app-context';
import {UserContext, UserContextType} from '@/src/context/user-context';
import {postData} from '@/src/helpers/axiosClient';
import {toast} from 'react-hot-toast';
export default function MusicCard(params: MusicProps) {
	const {imageMusic, mucisId, singerName, musicSrc, index, type, musicName, category, timeFormat} = params;
	const musicContext = useContext(MusicContext) as MusicContextType;
	const {setPlaying, clearPlayer, setIsPlaying, playing} = musicContext;

	const appContext = useContext(AppContext) as AppContextType;
	const {isActiveHeader, isActivePlaylist} = appContext;

	const userContext = useContext(UserContext) as UserContextType;
	const {user} = userContext;
	return (
		<div className='music-card music cursor-pointer px-[5px]'>
			<div
				className={`image-music relative cursor-pointer transition-all duration-300 ease-linear w-full overflow-hidden rounded-lg
					${isActiveHeader && !isActivePlaylist ? 'w-[144px] h-[144px]' : ''} 
					${!isActiveHeader && isActivePlaylist ? 'w-[140px] h-[140px]' : ''} 
					${isActiveHeader && isActivePlaylist ? 'w-[110px] h-[110px]' : ''} 
					${!isActiveHeader && !isActivePlaylist ? 'w-[150px] h-[150px]' : ''}
				`}
			>
				<Image
					src={imageMusic}
					width={100}
					height={100}
					className={`object-cover rounded-lg transition-all duration-300 ease-linear w-[100%] h-[100%]`}
					alt={musicName}
				/>
				<div className='player absolute bg-[rgba(0,0,0,0.5)] top-0 left-0 w-full bottom-0 transition-all duration-300 ease-linear hidden'>
					<div
						className='transition-all duration-300 ease-linear p-4 hover:bg-[var(--light-gray)] w-[44px] h-[44px] text-[20px] rounded-full flex items-center justify-center'
						onClick={async () => {
							if (user.userId !== '') {
								const response = await postData('/api/music/my-favorite', {
									songId: mucisId,
									userId: user.userId,
								});
								if (response.success) {
									toast.success(response.message);
								} else {
									toast(response.message, {
										icon: '😙',
									});
								}
							}
						}}
					>
						<HeartOutlined />
					</div>
					<div
						onClick={() => {
							if (playing.mucisId !== mucisId) {
								clearPlayer();
								setPlaying({
									imageMusic,
									mucisId,
									singerName,
									musicSrc,
									musicName,
									category,
									timeFormat,
									index,
									type,
								});
								setIsPlaying(true);
								if (user.userId !== '') {
									postData('/api/music/history', {
										songId: mucisId,
										userId: user.userId,
									});
								}
							}
						}}
						className='transition-all duration-300 ease-linear p-4 hover:bg-[var(--light-gray)] w-[44px] h-[44px] text-[20px] rounded-full flex items-center justify-center'
					>
						<PlayCircleOutlined />
					</div>
				</div>
			</div>
			<div className='music-infor mt-2'>
				<div className='music-infor flex flex-col whitespace-nowrap overflow-hidden'>
					<span className='music-name text-[var(--text-primary)]'>{musicName}</span>
					<span className='text-sm text-[var(--text-secondary)]'>{singerName}</span>
				</div>
			</div>
		</div>
	);
}
