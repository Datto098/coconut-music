import {MusicProps} from '@/src/props/music-props';
import {postData} from '@/src/helpers/axiosClient';
import {UserContext, UserContextType} from '@/src/context/user-context';
import {MusicContext, MusicContextType} from '@/src/context/music-context';
import {HeartOutlined, PlayCircleOutlined} from '@ant-design/icons';
import Image from 'next/image';
import {useContext} from 'react';
import {toast} from 'react-hot-toast';
import Skeleton from '../loading/loadingSkeleton';
import Button from '../button/button';
import '../../styles/music.css';
function Music(params: MusicProps) {
	const {imageMusic, mucisId, singerName, musicSrc, type, musicName, category, index, timeFormat} = params;
	const musicContext = useContext(MusicContext) as MusicContextType;
	const {setPlaying, clearPlayer, setIsPlaying, playing} = musicContext;
	const userContext = useContext(UserContext) as UserContextType;
	const {user} = userContext;

	return (
		<div
			className={`${
				playing.mucisId === mucisId ? 'active' : ''
			} music flex items-center gap-2 p-[10px] rounded-lg cursor-pointer bg-[transparent] hover:shadow-xl hover:bg-[var(--gray)] relative transition-all duration-100 ease-linear`}
		>
			<div className='image-music rounded-lg overflow-hidden relative'>
				<Image
					src={imageMusic}
					alt={musicName ? musicName : ''}
					width={60}
					height={60}
					className='overflow-hidden object-cover w-[60px] h-[60px] max-[830px]:w-[50px] max-[830px]:h-[50px]'
				/>
				<div className='absolute animate-playing bottom-0 left-0 right-0'>
					{playing.mucisId === mucisId && (
						<div className='music-waves'>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</div>
					)}
				</div>
				<div className='player absolute bg-[rgba(0,0,0,0.5)] top-0 left-0 w-full bottom-0 transition-all rounded-lg duration-300 ease-linear hidden'>
					{playing.mucisId !== mucisId && (
						<Button
							rounded
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
						</Button>
					)}
				</div>
			</div>
			<div className='music-infor flex flex-col'>
				<h2 className='music-name text-[var(--text-primary)]'>{musicName}</h2>
				<h2 className='singer-name text-sm text-[var(--text-secondary)]'>{singerName}</h2>
			</div>
			<Button
				rounded
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
				className='more-action transition-all duration-300 ease-linear p-4 bg-[var(--light-gray)] w-[44px] h-[44px] text-[20px] rounded-full items-center justify-center absolute top-[50%] right-[12px] translate-y-[-50%] opacity-0'
			>
				<HeartOutlined />
			</Button>
		</div>
	);
}
const loading = () => {
	return (
		<div
			className={`music flex items-center gap-2 p-[10px] rounded-lg cursor-pointer hover:bg-[var(--brown-rgba)] relative transition-all duration-300 ease-linear`}
		>
			<Skeleton className='image-music rounded-lg overflow-hidden relative w-[60px] h-[60px] max-[830px]:w-[50px] max-[830px]:h-[50px]'>
				<Skeleton className='overflow-hidden object-cover w-[60px] h-[60px] max-[830px]:w-[50px] max-[830px]:h-[50px]' />
			</Skeleton>
			<div className='music-infor flex flex-col'>
				<Skeleton className='music-name text-[var(--text-primary)] p-2 w-[100px] rounded-lg mb-1' />
				<Skeleton className='singer-name text-sm text-[var(--text-secondary)] p-2 w-[80px] rounded-lg' />
			</div>
		</div>
	);
};

Music.loading = loading;

export default Music;
