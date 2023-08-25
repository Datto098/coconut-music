'use client';
import Button from '@/src/components/button/button';
import UploadForm from '@/src/components/form/upload';
import Input from '@/src/components/input/input';
import MusicCard from '@/src/components/music/music-card';
import {AppContext, AppContextType} from '@/src/context/app-context';
import {UserContext, UserContextType} from '@/src/context/user-context';
import {getData, postData} from '@/src/helpers/axiosClient';
import {MusicDataProps} from '@/src/props/music-props';
import {FolderAddOutlined, PlusOutlined} from '@ant-design/icons';
import {useContext, useEffect, useState} from 'react';
import {toast} from 'react-hot-toast';

export default function UploadPage(params: any) {
	const appContext = useContext(AppContext) as AppContextType;
	const {isActiveUploadForm, setIsActiveUploadForm, theme} = appContext;
	const userContext = useContext(UserContext) as UserContextType;
	const {user} = userContext;
	const [newPlaylist, setNewPlaylist] = useState('');
	const [playlist, setPlaylist] = useState<any>([]);
	const [musicPlaylist, setMusicPlaylist] = useState<MusicDataProps[]>([]);
	const [activePlaylist, setActivePlaylist] = useState({
		index: 0,
		id: 'unknown',
	});

	const createNewPlayList = async () => {
		try {
			const response = await postData('/api/music/my-playlist/playlist', {
				userId: user.userId,
				playListName: newPlaylist,
			});
			if (response.success) {
				setNewPlaylist('');
				toast.success(response.message);
				getData(`/api/music/my-playlist/playlist?user_id=${user.userId}`, setPlaylist);
			} else {
				toast.error(response.message);
			}
		} catch (error: any) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	useEffect(() => {
		if (user.userId !== '') {
			getData(`/api/music/my-playlist/playlist?user_id=${user.userId}`, setPlaylist);
		}
	}, [user]);

	useEffect(() => {
		if (playlist.length > 0) {
			setActivePlaylist({
				index: 0,
				id: playlist[0]._id,
			});
		}
	}, [playlist]);

	useEffect(() => {
		if (activePlaylist.id !== 'unknown' && user.userId !== '') {
			getData(
				`/api/music/my-playlist/playlist/music?user_id=${user.userId}&playlist_id=${activePlaylist.id}`,
				setMusicPlaylist
			);
		}
	}, [activePlaylist, user]);

	useEffect(() => {
		console.log(musicPlaylist);
	}, [musicPlaylist]);

	return (
		<>
			<div
				data-theme={theme}
				className={`fixed top-[0] left-[0] bottom-[0] right-[0] bg-[var(--brown-rgba)] backdrop-filter backdrop-blur-sm  backdrop-contrast-100 transition-all duration-500 ease-linear
					${isActiveUploadForm ? 'opacity-[1] z-[10]' : 'opacity-[0] z-[-1]'}
					`}
			></div>
			<UploadForm type={activePlaylist.id !== 'unknown' && activePlaylist.id} />
			<div
				className='content-wrapper p-4'
				data-theme={theme}
			>
				<h1 className='text-center text-[var(--text-primary)] text-[20px] font-[500] mb-4 p-4  bg-[var(--light-gray)] rounded-xl page-title m-auto'>
					Danh sách phát của bạn
				</h1>
				<div className='flex items-center justify-between mb-4'>
					<div>
						<ul className='flex items-center justify-start gap-2'>
							{playlist.length > 0 ? (
								playlist.map((playlistItem: any, index: number) => {
									return (
										<li
											key={playlistItem._id}
											onClick={() => {
												setActivePlaylist({
													index: index,
													id: playlistItem._id,
												});
											}}
										>
											<Button primary={activePlaylist.index === index}>{playlistItem.playlist_name}</Button>
										</li>
									);
								})
							) : (
								<li>
									<Button primary>Chưa có danh sách phát mới</Button>
								</li>
							)}
						</ul>
					</div>
					<div className='relative'>
						<Input
							placeholder='Nhập vào tên danh sách phát mới...'
							id='new-play-list'
							value={newPlaylist}
							type='text'
							onChange={(e: any) => {
								setNewPlaylist(e.target.value);
							}}
						/>
						<Button
							onClick={() => {
								if (newPlaylist.length > 0) {
									createNewPlayList();
								} else {
									toast.error('Không thể để trống danh sách phát');
								}
							}}
							primary
							rounded
							className='gap-2 absolute top-0 right-0 bottom-0 active'
						>
							<FolderAddOutlined className='text-[20px]' />
						</Button>
					</div>
				</div>
				<div className='mb-2'>
					<div className='grid grid-cols-12 gap-2 max-[940px]:grid-cols-2 max-[480px]:grid-cols-1 mb-3'>
						{musicPlaylist &&
							musicPlaylist.map((music, index) => {
								return (
									<MusicCard
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
				<div className='flex items-center justify-end'>
					<Button
						onClick={() => {
							setIsActiveUploadForm(true);
						}}
						rounded
					>
						<PlusOutlined />
					</Button>
				</div>
			</div>
		</>
	);
}
