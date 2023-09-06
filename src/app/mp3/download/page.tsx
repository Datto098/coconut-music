'use client';

import Button from '@/src/components/button/button';
import {getData} from '@/src/helpers/axiosClient';
import {FileOutlined} from '@ant-design/icons';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {toast} from 'react-hot-toast';
export default function DownloadMp3Page() {
	const [youtubeUrl, setYoutubeUrl] = useState('');
	const [isFetchingData, setIsFetchingData] = useState(false);
	const [disabledBtnGetDataFromYTB, setDisabledBtnGetDataFromYTB] = useState(true);
	const [data, setData] = useState<any>(null);
	const [process, setProcess] = useState<any>(0);
	const [isHidden, setIsHidden] = useState(true);

	const handleDownloadMp3File = async () => {
		if (youtubeUrl !== '') {
			setIsFetchingData(true);
			toast('Đang tải xuống, vui lòng đợi !', {
				icon: '🔽',
			});

			try {
				setIsHidden(false);
				const response = await axios.get(`/api/mp3/download?url=${youtubeUrl}`, {
					responseType: 'blob', // Đặt responseType thành 'blob' để Axios biết bạn muốn tải một file blob
					onDownloadProgress: (progressEvent: any) => {
						// Xử lý tiến trình tải xuống ở đây
						const megabytes = progressEvent.loaded / (1024 * 1024);
						console.log(`Downloaded ${Math.round(parseInt(megabytes.toFixed(2)))} MB`);
						setProcess(Math.round(parseInt(megabytes.toFixed(2))));
					},
				});

				if (response.status === 201) {
					const blob = new Blob([response.data]);
					const url = window.URL.createObjectURL(blob);

					const a = document.createElement('a');
					a.href = url;
					a.download = `${data.videoTitle}.mp3`; // Đặt tên file bạn muốn lưu
					a.style.display = 'none'; // Ẩn thẻ <a> để người dùng không thấy
					document.body.appendChild(a);
					a.click();

					// Sau khi tải xong, loại bỏ thẻ <a> và URL tạo ra
					document.body.removeChild(a);
					window.URL.revokeObjectURL(url);
				}
			} catch (error) {
				console.error('Lỗi tải xuống:', error);
			}

			setIsFetchingData(false);
			setYoutubeUrl('');
		}
	};

	const handleGetMp3DataFromYoutube = async () => {
		if (youtubeUrl !== '') {
			await getData(`/api/mp3/get-info?url=${youtubeUrl}`, setData);
			setIsFetchingData(false);
		}
	};

	useEffect(() => {
		if (data) {
			setProcess(0);
		}
	}, [data]);

	useEffect(() => {
		if (youtubeUrl !== '') {
			setDisabledBtnGetDataFromYTB(false);
		} else {
			setDisabledBtnGetDataFromYTB(true);
		}
	}, [youtubeUrl]);

	return (
		<>
			<Head>
				<title>Coconut download mp3 - Tải nhạc mp3 từ youtube miễn phí</title>
				<meta
					name='description'
					content='Tải nhạc mp3 từ youtube miễn phí'
				/>
			</Head>
			<div className='content-wrapper p-4'>
				{!isHidden && (
					<div
						className='fixed z-[12] flex cursor-pointer flex-col gap-2 overflow-hidden flex-nowrap bottom-2 right-4 bg-[var(--text-primary)] text-[var(--background)] shadow-xl p-4 rounded-lg transition-all duration-300 ease-linear'
						onClick={(e: any) => {
							setIsHidden(true);
						}}
					>
						<div className='flex gap-2 items-center justify-center font-bold'>
							<FileOutlined />
							<h3 className='whitespace-nowrap'>{data.videoTitle}</h3>
						</div>
						<div className='text-sm'>
							<span>Đã tải xuống: {process} MB</span>
						</div>
					</div>
				)}
				<h1 className='text-[var(--text-primary)] text-lg font-[600] text-center mb-[20px]'>Tải mp3 từ youtube</h1>
				<div className='flex items-center justify-between gap-3 mb-[20px]'>
					<div className='form-control w-full'>
						<div className='text-field'>
							<label htmlFor='input-music-name'>Đường dẫn video từ youtube</label>
							<input
								value={youtubeUrl}
								autoComplete='off'
								type='text'
								id='input-music-name'
								placeholder='https://www.youtube.com/watch?v=5V6bHm1pklA...'
								onChange={(e) => {
									setYoutubeUrl(e.target.value);
								}}
							/>
						</div>
					</div>
					<Button
						isHandling={isFetchingData}
						disabled={disabledBtnGetDataFromYTB}
						onClick={() => {
							if (!disabledBtnGetDataFromYTB) {
								setIsFetchingData(true);
								handleGetMp3DataFromYoutube();
							}
						}}
						primary
					>
						Tải thông tin MP3
					</Button>
				</div>
				{data && (
					<div className='mt-4 rounded-xl border border-dashed p-4 border-[var(--purple)]'>
						<div className='flex items-center justify-center'>
							<Image
								className='w-[336px] h-[188px] rounded-xl max-[600px]:w-[100%]'
								src={data.videoThumbnail}
								alt='download mp3 free'
								width={336}
								height={188}
							/>
						</div>
						<div className='text-center mt-3 font-bold text-normal'>
							<h3>{data.videoTitle}</h3>
						</div>
						<div className='flex items-center justify-center mt-4'>
							<Button
								isHandling={isFetchingData}
								disabled={isFetchingData}
								onClick={() => {
									if (!isFetchingData) {
										setProcess(0);
										handleDownloadMp3File();
									}
								}}
								primary
							>
								Tải MP3 file
							</Button>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
