'use client';
import Button from '@/components/button/button';
import {postData} from '@/helpers/axiosClient';
import {CloudUploadOutlined} from '@ant-design/icons';
import Image from 'next/image';
import {useState} from 'react';
import ReactAudioPlayer from 'react-audio-player';
import {covertTimeFormat} from '@/helpers/convertTime';
export default function UploadPage(params: any) {
	const [musicName, setMusicName] = useState('');
	const [category, setCategory] = useState('');
	const [singerName, setSingerName] = useState('');
	const [type, setType] = useState('');
	const [mp3File, setMp3File] = useState<any>(null);
	const [imgFile, setImgFile] = useState<any>(null);
	const [timeFormat, setTimeformat] = useState('');

	const handleUploadMusic = async () => {
		try {
			const formData = new FormData();
			formData.set('musicName', musicName);
			formData.set('category', category);
			formData.set('singerName', singerName);
			formData.set('type', type);
			formData.set('fileMp3', mp3File);
			formData.set('fileImg', imgFile);
			formData.set('timeFormat', timeFormat);

			const response = await postData('/api/music/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
				},
			});

			console.log(response.data);
		} catch (error: any) {
			console.error(error.message);
		}
	};

	return (
		<div className='content-wrapper p-4'>
			<div className='upload-form max-w-[860px] bg-[var(--brown)] m-auto p-[40px] rounded-xl'>
				<h3 className='text-white text-lg font-[600] text-center mb-[20px]'>Thêm bài hát mới</h3>
				<div className='flex items-center justify-between gap-3 mb-[20px]'>
					<div className='form-control w-full'>
						<div className='text-field'>
							<label htmlFor='input-music-name'>Tên bài hát</label>
							<input
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
				<div className='flex items-center justify-between gap-3 mb-[20px]'>
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
								setMp3File(e.target.files[0]);
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
				<div className='flex justify-between items-start gap-3 mb-[20px]'>
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
								setImgFile(e.target.files[0]);
							}}
						/>
					</label>
				</div>
				<div className={`image-demo overflow-hidden rounded-lg mb-[20px]`}>
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
						handleUploadMusic();
					}}
					primary
					className='m-auto'
				>
					Thêm bài hát mới
				</Button>
			</div>
		</div>
	);
}
