'use client';
import Image from 'next/image';
import Button from '../button/button';
import '../../styles/music.css';
import {
	HeartOutlined,
	MoreOutlined,
	NotificationOutlined,
	PauseCircleOutlined,
	PlayCircleOutlined,
	RetweetOutlined,
	StepBackwardOutlined,
	StepForwardOutlined,
	UnorderedListOutlined,
} from '@ant-design/icons';
import {useContext, useEffect, useRef, useState} from 'react';
import {MusicContext, MusicContextType} from '@/src/context/music-context';
import ReactAudioPlayer from 'react-audio-player';
import {AppContext, AppContextType} from '@/src/context/app-context';

export default function Player(params: any) {
	const processRef = useRef<any>(null);
	const volumeRef = useRef<any>(null);
	const audioRef = useRef<any>(null);
	const [isReadyToDrag, setIsReadyToDrag] = useState<boolean>(false);
	const [isReadyToDragVolume, setIsReadyToDragVolume] = useState<boolean>(false);
	const musicContext = useContext(MusicContext) as MusicContextType;
	const [currentVolume, setCurrentVolume] = useState<number>(0);
	const {
		duration,
		setDuration,
		currentTimePlay,
		processPlaying,
		setProcessPlaying,
		loadNextSong,
		isPlaying,
		setIsPlaying,
		loadPrevSong,
		isLoop,
		setIsLoop,
		playing,
		volume,
		setVolume,
		setCurrentTimePlay,
		reLoad,
	} = musicContext;

	const appContext = useContext(AppContext) as AppContextType;
	const {setIsActivePlaylist} = appContext;

	// Convert duration to seconds
	const formatTimePlay = (currentTimePlay: number) => {
		let minutes = Math.floor(currentTimePlay / 60);
		let seconds = Math.floor(currentTimePlay % 60);
		if (seconds < 10) {
			return minutes + ':0' + seconds;
		}
		return minutes + ':' + seconds;
	};

	// Convert time string like minute:second to total number of second
	const timeStringToSeconds = (timeString: string) => {
		const timeParts = timeString.split(':');
		if (timeParts.length !== 2) {
			return false;
		}
		const minute = parseInt(timeParts[0]);
		const second = parseInt(timeParts[1]);
		const totalSeconds = minute * 60 + second;
		return totalSeconds;
	};

	// Get DOM element
	useEffect(() => {
		processRef.current = document.querySelector('.process');
		volumeRef.current = document.querySelector('.volume');
		audioRef.current = document.querySelector('.audio');
	}, []);

	// Set the default volume to current volume
	useEffect(() => {
		if (volume) {
			setCurrentVolume(volume);
		}
	}, []);

	// Get duration of audio
	useEffect(() => {
		if (playing.timeFormat) {
			const seconds = timeStringToSeconds(playing.timeFormat);
			if (seconds !== false) {
				setDuration(seconds);
			}
		}
	}, [playing.timeFormat, setDuration]);

	// Drag processing of audio
	useEffect(() => {
		const handleMouseDown = () => {
			setIsReadyToDrag(true);
		};

		const handleMouseUp = () => {
			setIsReadyToDrag(false);
		};

		const handleMouseMove = (e: any) => {
			if (processRef) {
				const clientX = e.clientX;
				const left = processRef.current.getBoundingClientRect().left;
				const width = processRef.current.getBoundingClientRect().width;
				const min = left;
				const max = width + left;

				if (clientX < min || clientX > max) {
					setIsReadyToDrag(false);
				} else {
					if (isReadyToDrag) {
						const percent = ((clientX - min) / width) * 100;
						setProcessPlaying(percent);
					}
				}
			}
		};

		if (processRef) {
			processRef.current.addEventListener('mousedown', handleMouseDown);
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);

			return () => {
				processRef.current.removeEventListener('mousedown', handleMouseDown);
				document.removeEventListener('mousemove', handleMouseMove);
				document.removeEventListener('mouseup', handleMouseUp);
			};
		}
	}, [isReadyToDrag, setProcessPlaying]);

	useEffect(() => {
		if (!isReadyToDrag) {
			if (audioRef) {
				audioRef.current.currentTime = (processPlaying * duration) / 100;
			}
		}
	}, [isReadyToDrag]);

	// Drag volume of audio
	useEffect(() => {
		const handleMouseDown = () => {
			setIsReadyToDragVolume(true);
		};

		const handleMouseUp = () => {
			setIsReadyToDragVolume(false);
		};

		const handleMouseMove = (e: any) => {
			if (!isReadyToDragVolume) return;

			if (volumeRef) {
				const {clientX} = e;
				const {left, width} = volumeRef.current.getBoundingClientRect();
				const min = left;
				const max = width + left;

				if (clientX < min || clientX > max) {
					setIsReadyToDragVolume(false);
				} else {
					const percent = (clientX - min) / width;
					setCurrentVolume(percent);
				}
			}
		};

		if (volumeRef) {
			volumeRef.current.addEventListener('mousedown', handleMouseDown);
			volumeRef.current.addEventListener('mousemove', handleMouseMove);
			volumeRef.current.addEventListener('mouseup', handleMouseUp);

			return () => {
				volumeRef.current.removeEventListener('mousedown', handleMouseDown);
				volumeRef.current.removeEventListener('mousemove', handleMouseMove);
				volumeRef.current.removeEventListener('mouseup', handleMouseUp);
			};
		}
	}, [isReadyToDragVolume, setCurrentVolume]);

	useEffect(() => {
		if (currentVolume && !isReadyToDragVolume) {
			setVolume(currentVolume);
		}
	}, [isReadyToDragVolume]);

	// Toggle isPlaying
	useEffect(() => {
		if (audioRef) {
			if (isPlaying) {
				audioRef.current.play();
			} else {
				audioRef.current.pause();
			}
		}
	}, [isPlaying]);

	return (
		<div
			className='player-bar px-2 py-3 fixed bg-[var(--background-dark)] bottom-0 left-0 w-full right-0 border-[var(--light-gray)] border-t z-2 flex items-center justify-between'
			style={playing.musicName ? {transform: 'translateY(0)'} : {transform: 'translateY(100%)'}}
		>
			<div className='music-infor flex gap-3 items-center min-w-[500px]'>
				<div className='overflow-hidden rounded-lg'>
					<Image
						src={playing.imageMusic ? playing.imageMusic : '/next.svg'}
						alt={playing.musicName}
						width={64}
						height={64}
						className='w-[64px] h-[64px] object-cover rounded-e-lg'
					/>
				</div>
				<div className='flex flex-col justify-center'>
					<span className='music-name text-[var(--text-primary)]'>{playing.musicName}</span>
					<span className='text-sm text-[var(--text-secondary)]'>{playing.singerName}</span>
				</div>
				<div className='flex gap-3'>
					<Button
						onClick={() => {}}
						rounded
					>
						<HeartOutlined />
					</Button>
					<Button
						onClick={() => {}}
						rounded
					>
						<MoreOutlined />
					</Button>
				</div>
			</div>
			<div className='control flex-1'>
				<ReactAudioPlayer
					ref={audioRef}
					className='hidden audio'
					src={playing.musicSrc}
					listenInterval={1000}
					volume={volume}
					autoPlay
					controls
					onListen={(e: any) => {
						if (typeof e === 'number') {
							if (!isReadyToDrag) {
								setCurrentTimePlay(e);
							}
							setProcessPlaying(Math.round((e / duration) * 100));
						}
					}}
					onEnded={() => {
						if (isLoop) {
							reLoad();
							audioRef.current.play();
						} else {
							loadNextSong();
						}
					}}
				/>
				<div>
					<div className='flex gap-2 items-center justify-center'>
						<Button
							onClick={() => {
								loadPrevSong();
							}}
							rounded
						>
							<StepBackwardOutlined />
						</Button>
						<Button
							onClick={() => {
								setIsPlaying((prev) => {
									return prev ? false : true;
								});
							}}
							rounded
						>
							{isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
						</Button>
						<Button
							onClick={() => {
								loadNextSong();
							}}
							rounded
						>
							<StepForwardOutlined />
						</Button>
						<Button
							onClick={() => {
								setIsLoop((prev) => {
									return prev ? false : true;
								});
							}}
							rounded
							active={isLoop ? true : false}
						>
							<RetweetOutlined />
						</Button>
					</div>
					<div className='flex items-center justify-center gap-3'>
						<span className='text-sm text-[var(--text-secondary)]'>{formatTimePlay(Math.round(currentTimePlay))}</span>
						<div>
							<div className='process'>
								<div className='slider-bar'>
									<div
										className='slide-process'
										style={
											isReadyToDrag
												? {width: `${processPlaying}%`, transition: 'all 0.1s ease'}
												: {width: `${processPlaying}%`, transition: 'all 1s ease-in-out'}
										}
									></div>
								</div>
							</div>
						</div>
						<span className='text-sm'>{playing.timeFormat ? playing.timeFormat : formatTimePlay(duration)}</span>
					</div>
				</div>
			</div>
			<div className='other-action min-w-[500px]'>
				<div className='flex gap-2 justify-end'>
					<div className='flex items-center gap-2 volume-box'>
						<Button
							onClick={() => {}}
							rounded
							primary
						>
							<NotificationOutlined />
						</Button>
						<div className='volume'>
							<div className='slider-bar'>
								<div
									className='slide-process'
									style={currentVolume ? {width: `${currentVolume * 100}%`} : {width: '0%'}}
								></div>
							</div>
						</div>
					</div>
					<Button
						onClick={() => {
							setIsActivePlaylist((prev) => {
								return prev ? false : true;
							});
						}}
						primary
						rounded
					>
						<UnorderedListOutlined />
					</Button>
				</div>
			</div>
		</div>
	);
}
