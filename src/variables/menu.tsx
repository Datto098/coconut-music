import {CloudUploadOutlined, HeartOutlined, HomeOutlined, YoutubeOutlined} from '@ant-design/icons';

export const menus = [
	{
		id: 0,
		title: 'Trang chủ',
		link: '/',
		icon: <HomeOutlined />,
	},
	{
		id: 1,
		title: 'Đã yêu thích',
		link: '/my-favorite',
		icon: <HeartOutlined />,
	},
	{
		id: 2,
		title: 'Nhạc của tôi',
		link: '/my-playlist',
		icon: <CloudUploadOutlined />,
	},
	{
		id: 3,
		title: 'Tải nhạc từ Youtube',
		link: '/mp3/download',
		icon: <YoutubeOutlined />,
	},
];
