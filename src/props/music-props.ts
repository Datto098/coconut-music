export interface MusicProps {
	imageMusic: string;
	mucisId: string;
	singerName: string;
	musicSrc: string;
	musicName: string;
	category: string;
	timeFormat: string;
	index: number;
	type: string;
	active?: boolean;
}

export interface MusicDataProps {
	_id: string;
	image_music: string;
	name_singer: string;
	src_music: string;
	name_music: string;
	category: string;
	time_format: string;
	type: string;
}
