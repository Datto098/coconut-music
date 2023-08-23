import {MusicProps} from '@/props/music-props';
import {HeartOutlined, MoreOutlined, PlayCircleOutlined} from '@ant-design/icons';
import Image from 'next/image';
import {useContext} from 'react';
import {MusicContext, MusicContextType} from '@/context/music-context';
import '../../styles/music.css';
import {UserContext, UserContextType} from '@/context/user-context';
import {postData} from '@/helpers/axiosClient';
import {toast} from 'react-hot-toast';
export default function Music(params: MusicProps) {
	const {
		imageMusic,
		mucisId,
		singerName,
		musicSrc,
		type,
		musicName,
		category,
		index,
		timeFormat,
		active = false,
	} = params;
	const musicContext = useContext(MusicContext) as MusicContextType;
	const {setPlaying, clearPlayer, setIsPlaying, playing} = musicContext;
	const userContext = useContext(UserContext) as UserContextType;
	const {user} = userContext;

	return (
		<div
			className={`${
				active ? 'active' : ''
			} music flex items-center gap-2 p-[10px] rounded-lg cursor-pointer hover:bg-[var(--light-brown)] relative transition-all duration-300 ease-linear`}
		>
			<div className='image-music rounded-lg overflow-hidden relative'>
				<Image
					src={imageMusic}
					alt={musicName ? musicName : ''}
					width={60}
					height={60}
					className='overflow-hidden object-cover w-[60px] h-[60px]'
				/>
				<div className='player absolute bg-[rgba(0,0,0,0.5)] top-0 left-0 w-full bottom-0 transition-all duration-300 ease-linear hidden'>
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
						className='transition-all duration-300 ease-linear p-4  w-[44px] h-[44px] text-[20px] rounded-full flex items-center justify-center'
					>
						<PlayCircleOutlined />
					</div>
				</div>
			</div>
			<div className='music-infor flex flex-col'>
				<span className='music-name text-[var(--text-primary)]'>{musicName}</span>
				<span className='singer-name text-sm text-[var(--text-secondary)]'>{singerName}</span>
			</div>
			<div
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
				className='more-action transition-all duration-300 ease-linear p-4 bg-[var(--light-gray)] w-[44px] h-[44px] text-[20px] rounded-full hidden items-center justify-center absolute top-[50%] right-[12px] translate-y-[-50%]'
			>
				<HeartOutlined />
			</div>
		</div>
	);
}
