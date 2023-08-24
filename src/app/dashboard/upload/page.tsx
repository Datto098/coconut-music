'use client';
import {CloudUploadOutlined} from '@ant-design/icons';
import Image from 'next/image';
import {useContext, useEffect, useState} from 'react';
import ReactAudioPlayer from 'react-audio-player';
import {covertTimeFormat} from '@/src/helpers/convertTime';
import {postData} from '@/src/helpers/axiosClient';
import Button from '@/src/components/button/button';
import {toast} from 'react-hot-toast';
import {storageFileUpload} from '@/src/firebase/utils';
import {UserContext, UserContextType} from '@/src/context/user-context';
import {useRouter} from 'next/navigation';

export default function UploadPage(params: any) {
	const [musicName, setMusicName] = useState('');
	const [category, setCategory] = useState('');
	const [singerName, setSingerName] = useState('');
	const [type, setType] = useState('');
	const [mp3File, setMp3File] = useState<any>(null);
	const [imgFile, setImgFile] = useState<any>(null);
	const [timeFormat, setTimeformat] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [isFetchingData, setIsFetchingData] = useState(false);
	const [urlMp3File, setUrlMp3File] = useState<any>(null);
	const [urlImgFile, setUrImgFile] = useState<any>(null);
	const [isSaved, setIsSaved] = useState(false);
	const userContext = useContext(UserContext) as UserContextType;
	const {user} = userContext;
	const router = useRouter();
	const checkAminUser = async () => {
		const response = await postData('/api/users/admin', {
			userId: user.userId,
		});
		if (!response.success) {
			router.push('/');
		}
	};

	const handleUploadMusic = async () => {
		try {
			const formData = new FormData();
			formData.set('musicName', musicName);
			formData.set('category', category);
			formData.set('singerName', singerName);
			formData.set('type', type);
			formData.set('fileMp3', urlMp3File);
			formData.set('fileImg', urlImgFile);
			formData.set('timeFormat', timeFormat);
			const response = await postData('/api/music/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
				},
			});
			if (response.success) {
				toast.success(response.message);
				setMusicName('');
				setCategory('');
				setSingerName('');
				setTimeformat('');
				setType('');
				setImgFile(null);
				setMp3File(null);
				setUrImgFile(null);
				setUrlMp3File(null);
				setIsSaved(false);
			} else {
				toast.error(response.message);
			}
			setIsFetchingData(false);
		} catch (error: any) {
			toast.error('Đã xảy ra lỗi trong quá trình tải nhạc vui lòng thử lại sau');
			console.error(error.message);
		}
	};

	useEffect(() => {
		if (user.userId !== '') {
			checkAminUser();
		}
	}, [user]);

	useEffect(() => {
		if (musicName.length > 0 && category.length > 0 && type.length > 0 && mp3File !== null && imgFile !== null) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [category, imgFile, mp3File, musicName, type]);

	useEffect(() => {
		if (isFetchingData) {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, [isFetchingData]);

	useEffect(() => {
		if (isSaved) {
			if (urlImgFile !== null && urlMp3File !== null) {
				handleUploadMusic();
			}
		}
	}, [urlImgFile, urlMp3File, isSaved]);

	return (
		<div className='content-wrapper p-4'>
			<div className='upload-form max-w-[860px] bg-[var(--brown)] m-auto p-[40px] rounded-xl'>
				<h3 className='text-white text-lg font-[600] text-center mb-[20px]'>Thêm bài hát mới</h3>
				<div className='flex items-center justify-between gap-3 mb-[20px]'>
					<div className='form-control w-full'>
						<div className='text-field'>
							<label htmlFor='input-music-name'>Tên bài hát</label>
							<input
								value={musicName}
								autoComplete='off'
								type='text'
								id='input-music-name'
								placeholder='FIRE ...'
								onChange={(e) => {
									setMusicName(e.target.value);
								}}
							/>
						</div>
					</div>
					<div className='form-control w-full'>
						<div className='text-field'>
							<label htmlFor='input-music-category'>Category</label>
							<input
								value={category}
								autoComplete='off'
								type='text'
								id='input-music-category'
								placeholder='Phonk ...'
								onChange={(e) => {
									setCategory(e.target.value);
								}}
							/>
						</div>
					</div>
				</div>
				<div className='flex items-center justify-between gap-3 mb-[20px]'>
					<div className='form-control w-full'>
						<div className='text-field'>
							<label htmlFor='input-singer-name'>Tên ca sĩ</label>
							<input
								value={singerName}
								autoComplete='off'
								type='text'
								id='input-singer-name'
								placeholder='Tommy Shelby ...'
								onChange={(e) => {
									setSingerName(e.target.value);
								}}
							/>
						</div>
					</div>
					<div className='form-control w-full'>
						<div className='text-field'>
							<label htmlFor='input-music-type'>Thể loại</label>
							<input
								value={type}
								autoComplete='off'
								type='text'
								id='input-music-type'
								placeholder='Sigma ...'
								onChange={(e) => {
									setType(e.target.value);
								}}
							/>
						</div>
					</div>
				</div>
				<div
					className='flex items-center justify-between gap-3 mb-[20px]'
					onDragOver={(e: any) => {
						e.preventDefault();
						e.stopPropagation();
					}}
					onDrop={(e: any) => {
						e.preventDefault();
						e.stopPropagation();
						if (e.dataTransfer.files && e.dataTransfer.files[0]) {
							const file = e.dataTransfer.files[0];
							if (file.type === 'audio/mpeg') {
								setMp3File(file);
							} else {
								toast.error('Tệp nhạc phải là mp3');
							}
						}
					}}
				>
					<label
						htmlFor='mp3-file'
						className='label-upload'
					>
						<span className='btn-upload'>
							Tải tệp âm thanh
							<CloudUploadOutlined />
						</span>
						<span className='show-upload'>{mp3File ? mp3File.name : ''}</span>
						<input
							hidden
							type='file'
							className='file-upload'
							id='mp3-file'
							onChange={(e: any) => {
								const file = e.target.files[0];
								if (file.type === 'audio/mpeg') {
									setMp3File(file);
								} else {
									toast.error('Tệp nhạc phải là mp3');
								}
							}}
						/>
					</label>
					<ReactAudioPlayer
						id='audio-demo'
						onCanPlay={(e: any) => {
							setTimeformat(covertTimeFormat(e.target.duration));
						}}
						className='audio-demo'
						src={mp3File ? URL.createObjectURL(mp3File) : undefined}
						controls
					/>
				</div>
				<div
					className='flex justify-between items-start gap-3 mb-[20px]'
					onDragOver={(e: any) => {
						e.preventDefault();
						e.stopPropagation();
					}}
					onDrop={(e: any) => {
						e.preventDefault();
						e.stopPropagation();
						if (e.dataTransfer.files && e.dataTransfer.files[0]) {
							const file = e.dataTransfer.files[0];
							if (
								file.type === 'image/jpeg' ||
								file.type === 'image/jpg' ||
								file.type === 'image/webp' ||
								file.type === 'image/png'
							) {
								setImgFile(file);
							} else {
								toast.error('Tệp ảnh phải là jpeg, jpg, webp or png');
							}
						}
					}}
				>
					<label
						htmlFor='img-file'
						className='label-upload'
					>
						<span className='btn-upload'>
							Tải tệp hình ảnh
							<CloudUploadOutlined />
						</span>
						<span className='show-upload'>{imgFile ? imgFile.name : ''}</span>
						<input
							hidden
							type='file'
							className='file-upload'
							id='img-file'
							onChange={(e: any) => {
								const file = e.target.files[0];
								console.log(file.type);
								if (
									file.type === 'image/jpeg' ||
									file.type === 'image/jpg' ||
									file.type === 'image/webp' ||
									file.type === 'image/png'
								) {
									setImgFile(file);
								} else {
									toast.error('tệp ảnh phải là jpeg, jpg, webp or png');
								}
							}}
						/>
					</label>
				</div>
				<div className={`image-demo overflow-hidden rounded-lg mb-[20px] max-h-[300px] max-w-[300px]`}>
					<Image
						className={`object-cover ${imgFile ? 'w-[100%] h-[100%]' : ''}`}
						src={imgFile ? URL.createObjectURL(imgFile) : ''}
						alt='image-demo'
						width={200}
						height={200}
					/>
				</div>
				<Button
					onClick={() => {
						if (!disabled) {
							setIsFetchingData(true);
							storageFileUpload(mp3File, 'mp3', setUrlMp3File);
							storageFileUpload(imgFile, 'img', setUrImgFile);
							setIsSaved(true);
						}
					}}
					isHandling={isFetchingData}
					disabled={disabled}
					primary
					className='m-auto'
				>
					Thêm bài hát mới
				</Button>
			</div>
		</div>
	);
}
