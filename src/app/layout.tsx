import type {Metadata} from 'next';
import MusicProvider from '@/src/context/music-context';
import AppProvider from '@/src/context/app-context';
import UserProvider from '@/src/context/user-context';
import Header from '../components/layouts/header/header';
import {Toaster} from 'react-hot-toast';
import SidebarLeft from '../components/sidebar/sidebar-left';
import LoginForm from '../components/form/login';
import SignUpForm from '../components/form/signUp';
import SidebarRight from '../components/sidebar/sidebar-right';
import Player from '../components/player/player';
import {Analytics} from '@vercel/analytics/react';
import './globals.css';
import '../styles/home.css';
import '../styles/custome.css';
import MobileButtonGroup from '../components/button/mobile-group-btn';

export const metadata: Metadata = {
	title: 'Coconut MP3 - Dịch vụ nghe nhạc trực tuyến',
	description:
		'Coconut MP3 - Dịch vụ nhạc số 1 với hàng triệu bài hát và MV có bản quyền chất lượng cao. Nghe nhạc, tải nhạc, tạo danh sách phát và đồng bộ kho nhạc cá nhân trên nhiều thiết bị.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang='en'>
			<meta
				name='google-site-verification'
				content='UJNVArfXuGm3Bv3FOjQltZVNJObgVqzmSNDsux9KJeg'
			/>
			<AppProvider>
				<UserProvider>
					<MusicProvider>
						<body>
							<Header />
							<div className='home mt-3'>
								<Toaster />
								<SidebarLeft />
								{children}
								<LoginForm />
								<SignUpForm />
								<SidebarRight />
								<Player />
								<Analytics />
								<MobileButtonGroup />
							</div>
						</body>
					</MusicProvider>
				</UserProvider>
			</AppProvider>
		</html>
	);
}
// Redeploy
