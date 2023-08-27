import {HeartOutlined, PlayCircleOutlined} from '@ant-design/icons';
import {MusicProps} from '@/src/props/music-props';
import Image from 'next/image';
import {useContext} from 'react';
import {MusicContext, MusicContextType} from '@/src/context/music-context';
import {UserContext, UserContextType} from '@/src/context/user-context';
import {postData} from '@/src/helpers/axiosClient';
import {toast} from 'react-hot-toast';
import Skeleton from '../loading/loadingSkeleton';
import Button from '../button/button';
import '../../styles/music.css';
export default function MusicCard(params: MusicProps) {
	const {imageMusic, mucisId, singerName, musicSrc, index, type, musicName, category, timeFormat} = params;
	const musicContext = useContext(MusicContext) as MusicContextType;
	const {setPlaying, clearPlayer, setIsPlaying, playing} = musicContext;

	const userContext = useContext(UserContext) as UserContextType;
	const {user} = userContext;
	return (
		<div className='music-card rounded-lg music cursor-pointer px-[5px] hover:scale-[1.2] p-2 bg-[var(--gray)] hover:z-[2] hover:shadow-xl transition-all duration-300 ease-linear'>
			<div
				className={`image-music relative cursor-pointer transition-all duration-300 ease-linear rounded-lg flex items-center justify-center`}
			>
				<Image
					src={imageMusic}
					width={100}
					height={100}
					className={`object-cover rounded-lg transition-all overflow-hidden duration-300 ease-linear w-[110px] h-[110px]`}
					alt={musicName}
				/>
				<div className='player absolute bg-[rgba(0,0,0,0.5)] top-0 left-0 w-full bottom-0 transition-all duration-300 ease-linear rounded-lg hidden'>
					<Button
						rounded
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
					</Button>
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
						className='transition-all duration-300 ease-linear p-4 hover:bg-[var(--light-gray)] w-[44px] h-[44px] text-[20px] rounded-full flex items-center justify-center'
					>
						<PlayCircleOutlined />
					</Button>
				</div>
			</div>
			<div className='music-infor mt-2'>
				<div className='music-infor flex flex-col whitespace-nowrap overflow-hidden'>
					<h2 className='music-name text-[var(--text-primary)]'>{musicName}</h2>
					<h2 className='text-sm text-[var(--text-secondary)]'>{singerName}</h2>
				</div>
			</div>
		</div>
	);
}

const loading = () => {
	return (
		<div className='music-card music cursor-pointer px-[5px]'>
			<div
				className={`image-music relative cursor-pointer transition-all duration-300 ease-linear overflow-hidden rounded-lg w-[full] h-[110px]`}
			>
				<Skeleton className={`rounded-lg transition-all duration-300 ease-linear w-[100%] h-[100%]`} />
			</div>
			<div className='music-infor mt-2'>
				<div className='music-infor flex flex-col whitespace-nowrap overflow-hidden'>
					<Skeleton className='music-name text-[var(--text-primary)] p-2 w-[100%] mb-1 rounded-lg' />
					<Skeleton className='text-sm text-[var(--text-secondary)] p-2 w-[100%] rounded-lg' />
				</div>
			</div>
		</div>
	);
};

MusicCard.loading = loading;
