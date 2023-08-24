import {postData} from '@/src/helpers/axiosClient';
import {CloseOutlined, CloudUploadOutlined} from '@ant-design/icons';
import Image from 'next/image';
import {useContext, useEffect, useState} from 'react';
import ReactAudioPlayer from 'react-audio-player';
import {covertTimeFormat} from '@/src/helpers/convertTime';
import Button from '../button/button';
import {AppContext, AppContextType} from '@/src/context/app-context';
import Input from '../input/input';
import {toast} from 'react-hot-toast';
import {storageFileUpload} from '@/src/firebase/utils';
export default function UploadForm(params: any) {
	const {type} = params;
	const [musicName, setMusicName] = useState('');
	const [category, setCategory] = useState('');
	const [singerName, setSingerName] = useState('');
	const [mp3File, setMp3File] = useState<any>(null);
	const [imgFile, setImgFile] = useState<any>(null);
	const [timeFormat, setTimeformat] = useState('');
	const [urlMp3File, setUrlMp3File] = useState<any>(null);
	const [urlImgFile, setUrImgFile] = useState<any>(null);
	const [isSaved, setIsSaved] = useState(false);
	const appContext = useContext(AppContext) as AppContextType;
	const {isActiveUploadForm, setIsActiveUploadForm} = appContext;
	const [disabled, setDisabled] = useState(true);
	const [isFetchingData, setIsFetchingData] = useState(false);

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
			const response = await postData('/api/music/my-playlist/upload', formData, {
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
		if (musicName.length > 0 && category.length > 0 && type.length > 0 && mp3File !== null && imgFile !== null) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [category, imgFile, mp3File, musicName, type]);

	useEffect(() => {
		if (isSaved) {
			if (urlImgFile !== null && urlMp3File !== null) {
				handleUploadMusic();
			}
		}
	}, [urlImgFile, urlMp3File, isSaved]);

	return (
		<div
			className={`fixed top-[50%] left-[50%] bg-[var(--brown)] w-[840px] rounded-xl backdrop-filter backdrop-grayscale  backdrop-blur-md  backdrop-contrast-200 transition-all duration-500 ease-linear z-[10] upload-form  min-w-[860px  m-auto  p-[40px]
					${
						isActiveUploadForm
							? 'translate-x-[-50%] translate-y-[-50%] opacity-[1]'
							: 'translate-x-[-250%] translate-y-[-250%] opacity-[0]'
					}
					`}
		>
			<Button
				onClick={() => {
					setIsActiveUploadForm(false);
				}}
				className='absolute right-3 top-3'
				rounded
			>
				<CloseOutlined />
			</Button>
			<h3 className='text-[var(--text-primary)] text-lg font-[600] text-center mb-[20px]'>Thêm bài hát mới</h3>
			<div className='flex items-center justify-between gap-3 mb-[20px]'>
				<div className='form-control w-full'>
					<Input
						value={musicName}
						type='text'
						id='input-music-name'
						placeholder='Tên bài hát ...'
						onChange={(e: any) => {
							setMusicName(e.target.value);
						}}
					/>
				</div>
				<div className='form-control w-full'>
					<Input
						value={category}
						type='text'
						id='input-category'
						placeholder='Thể loại (EDM, ROCK) ...'
						onChange={(e: any) => {
							setCategory(e.target.value);
						}}
					/>
				</div>
			</div>
			<div className='flex items-center justify-between gap-3 mb-[20px]'>
				<div className='form-control w-full'>
					<Input
						value={singerName}
						type='text'
						id='input-singer-name'
						placeholder='Tên ca sĩ ...'
						onChange={(e: any) => {
							setSingerName(e.target.value);
						}}
					/>
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
					<span className='show-upload'>{mp3File ? mp3File.name : 'Kéo thả file (mp3)'}</span>
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
						console.log(file.type);
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
					<span className='show-upload'>{imgFile ? imgFile.name : 'Kéo thả file (jpg, jpeg, png, webp)'}</span>
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
					className={`object-cover rounded-lg ${imgFile ? 'w-[100%]' : 'h-[100%]'}`}
					src={imgFile ? URL.createObjectURL(imgFile) : '/images/default-image.jpg'}
					alt=''
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
	);
}
