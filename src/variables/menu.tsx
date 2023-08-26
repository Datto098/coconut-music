import {CloudUploadOutlined, HeartOutlined, HomeOutlined} from '@ant-design/icons';

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
	// {
	// 	id: 2,
	// 	title: 'Bài hát đã nghe',
	// 	link: '/history',
	// 	icon: <HistoryOutlined />,
	// },
	{
		id: 3,
		title: 'Nhạc của tôi',
		link: '/my-playlist',
		icon: <CloudUploadOutlined />,
	},
];
