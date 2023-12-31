'use client';

import {getData} from '@/src/helpers/axiosClient';
import {MusicProps} from '@/src/props/music-props';
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
	vnLofiMusic: any[];
	setVNLofiMusic: React.Dispatch<React.SetStateAction<any[]>>;
	topViewMusic: any[];
	setTopViewMusic: React.Dispatch<React.SetStateAction<any[]>>;
	currentTimePlay: number;
	setCurrentTimePlay: React.Dispatch<React.SetStateAction<number>>;
	processPlaying: number;
	setProcessPlaying: React.Dispatch<React.SetStateAction<number>>;
	duration: number;
	setDuration: React.Dispatch<React.SetStateAction<number>>;
	clearPlayer: () => void;
	loadNextSong: any;
	loadPrevSong: any;
	reLoad: () => void;
	isPlaying: boolean;
	setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
	isLoop: boolean;
	setIsLoop: React.Dispatch<React.SetStateAction<boolean>>;
	volume: number;
	setVolume: React.Dispatch<React.SetStateAction<number>>;
	playlist: any[];
	setPlayList: React.Dispatch<React.SetStateAction<any[]>>;
	slideData: any[];
	setSlideData: React.Dispatch<React.SetStateAction<any[]>>;
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
	const [slideData, setSlideData] = useState<any[]>([]);
	const [vnLofiMusic, setVNLofiMusic] = useState<any[]>([]);

	useEffect(() => {
		if (playing.mucisId !== '') {
			getData(`/api/music/${playing.type}?_limit=100`, setPlayList);
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

	const loadNextSong = useCallback(() => {
		if (playlist.length > 0) {
			if (playing.index + 1 < playlist.length) {
				clearPlayer();
				setPlaying({
					imageMusic: playlist[playing.index + 1].image_music,
					mucisId: playlist[playing.index + 1]._id,
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
	}, [playing, playlist]);

	const loadPrevSong = useCallback(() => {
		if (playlist.length > 0) {
			if (playing.index - 1 >= 0) {
				clearPlayer();
				setPlaying({
					imageMusic: playlist[playing.index - 1].image_music,
					mucisId: playlist[playing.index - 1]._id,
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
	}, [playing, playlist]);

	const getSongs = async () => {
		await getData('/api/music/banner', setSlideData);
		await getData('/api/music/trending', setTrendingMusic);
		await getData('/api/music/new-music', setNewMusic);
		await getData('/api/music/favorite', setFavoriteMusic);
		await getData('/api/music/top-view', setTopViewMusic);
		await getData('/api/music/vn-lofi', setVNLofiMusic);
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
			slideData,
			setSlideData,
			vnLofiMusic,
			setVNLofiMusic,
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
			slideData,
			setSlideData,
			vnLofiMusic,
			setVNLofiMusic,
		]
	);
	return (
		<MusicContext.Provider value={value}>
			<>{children}</>
		</MusicContext.Provider>
	);
}
