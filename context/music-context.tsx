'use client';

import {getData} from '@/helpers/axiosClient';
import {MusicProps} from '@/props/music-props';
import {createContext, useCallback, useEffect, useMemo, useState} from 'react';

export type MusicContextType = {
	playing: MusicProps;
	setPlaying: React.Dispatch<React.SetStateAction<MusicProps>>;
	trendingMusic: any[];
	setTrendingMusic: React.Dispatch<React.SetStateAction<any[]>>;
	newMusic: any[];
	setNewMusic: React.Dispatch<React.SetStateAction<any[]>>;
	favoriteMusic: any[];
	setFavoriteMusic: React.Dispatch<React.SetStateAction<any[]>>;
	topViewMusic: any[];
	setTopViewMusic: React.Dispatch<React.SetStateAction<any[]>>;
	currentTimePlay: number;
	setCurrentTimePlay: React.Dispatch<React.SetStateAction<number>>;
	processPlaying: number;
	setProcessPlaying: React.Dispatch<React.SetStateAction<number>>;
	duration: number;
	setDuration: React.Dispatch<React.SetStateAction<number>>;
	clearPlayer: () => void;
	loadNextSong: () => void;
	loadPrevSong: () => void;
	reLoad: () => void;
	isPlaying: boolean;
	setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
	isLoop: boolean;
	setIsLoop: React.Dispatch<React.SetStateAction<boolean>>;
	volume: number;
	setVolume: React.Dispatch<React.SetStateAction<number>>;
	playlist: any[];
	setPlayList: React.Dispatch<React.SetStateAction<any[]>>;
};

export const MusicContext = createContext<MusicContextType | undefined>(undefined);

export default function MusicProvider(params: any) {
	const {children} = params;
	const [playing, setPlaying] = useState<MusicProps>({
		imageMusic: '',
		mucisId: '',
		singerName: '',
		musicSrc: '',
		musicName: '',
		category: '',
		timeFormat: '',
		index: -1,
		type: '',
	});
	const [trendingMusic, setTrendingMusic] = useState<any[]>([]);
	const [newMusic, setNewMusic] = useState<any[]>([]);
	const [favoriteMusic, setFavoriteMusic] = useState<any[]>([]);
	const [topViewMusic, setTopViewMusic] = useState<any[]>([]);
	const [currentTimePlay, setCurrentTimePlay] = useState<number>(0);
	const [processPlaying, setProcessPlaying] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [isLoop, setIsLoop] = useState<boolean>(false);
	const [volume, setVolume] = useState<number>(1);
	const [playlist, setPlayList] = useState<any[]>([]);

	useEffect(() => {
		if (playing) {
			switch (playing.type) {
				case 'trending':
					getData('/api/music/trending', setPlayList);
					break;
				case 'new-music':
					getData('/api/music/new-music', setPlayList);
					break;
				case 'favorite':
					getData('/api/music/favorite', setPlayList);
					break;
				case 'top-view':
					// getData('https://api-kaito-music.vercel.app/api/music/top-views?_limit=300', setPlayList);
					break;
				default:
					break;
			}
		}
	}, [playing]);

	const clearPlayer = () => {
		setDuration(0);
		setProcessPlaying(0);
		setCurrentTimePlay(0);
	};

	const reLoad = useCallback(() => {
		setCurrentTimePlay(0);
		setProcessPlaying(0);
	}, []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const loadNextSong = () => {
		if (playlist.length > 0) {
			if (playing.index + 1 < playlist.length) {
				clearPlayer();
				setPlaying({
					imageMusic: playlist[playing.index + 1].image_music,
					mucisId: playlist[playing.index + 1].image_music,
					singerName: playlist[playing.index + 1].name_singer,
					musicSrc: playlist[playing.index + 1].src_music,
					musicName: playlist[playing.index + 1].name_music,
					category: playlist[playing.index + 1].category,
					timeFormat: playlist[playing.index + 1].time_format,
					index: playing.index + 1,
					type: playing.type,
				});
			}
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const loadPrevSong = () => {
		if (playlist.length > 0) {
			if (playing.index - 1 >= 0) {
				clearPlayer();
				setPlaying({
					imageMusic: playlist[playing.index - 1].image_music,
					mucisId: playlist[playing.index - 1].image_music,
					singerName: playlist[playing.index - 1].name_singer,
					musicSrc: playlist[playing.index - 1].src_music,
					musicName: playlist[playing.index - 1].name_music,
					category: playlist[playing.index - 1].category,
					timeFormat: playlist[playing.index - 1].time_format,
					index: playing.index - 1,
					type: playing.type,
				});
			}
		}
	};

	const getSongs = async () => {
		await getData('/api/music/trending', setTrendingMusic);
		await getData('/api/music/new-music', setNewMusic);
		await getData('/api/music/favorite', setFavoriteMusic);
	};

	useEffect(() => {
		getSongs();
	}, []);

	const value = useMemo<MusicContextType>(
		() => ({
			playing,
			setPlaying,
			trendingMusic,
			setTrendingMusic,
			newMusic,
			setNewMusic,
			favoriteMusic,
			setFavoriteMusic,
			topViewMusic,
			setTopViewMusic,
			currentTimePlay,
			setCurrentTimePlay,
			processPlaying,
			setProcessPlaying,
			duration,
			setDuration,
			clearPlayer,
			loadNextSong,
			isPlaying,
			setIsPlaying,
			loadPrevSong,
			isLoop,
			setIsLoop,
			volume,
			setVolume,
			reLoad,
			playlist,
			setPlayList,
		}),
		[
			playing,
			setPlaying,
			trendingMusic,
			setTrendingMusic,
			newMusic,
			setNewMusic,
			favoriteMusic,
			setFavoriteMusic,
			topViewMusic,
			setTopViewMusic,
			currentTimePlay,
			setCurrentTimePlay,
			processPlaying,
			setProcessPlaying,
			duration,
			setDuration,
			loadNextSong,
			isPlaying,
			setIsPlaying,
			loadPrevSong,
			isLoop,
			setIsLoop,
			volume,
			setVolume,
			reLoad,
			playlist,
			setPlayList,
		]
	);
	return (
		<MusicContext.Provider value={value}>
			<>{children}</>
		</MusicContext.Provider>
	);
}
