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
import './globals.css';
import '../styles/home.css';
import '../styles/custome.css';

export const metadata: Metadata = {
	title: 'Coconut MP3',
	description:
		'Dịch vụ nhạc số 1 với hàng triệu bài hát và MV có bản quyền chất lượng cao, giúp bạn nghe nhạc, tải nhạc, upload và đồng bộ kho nhạc của tôi trên nhiều thiết ...',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang='en'>
			<AppProvider>
				<UserProvider>
					<MusicProvider>
						<body>
							<Header />
							<div className='home'>
								<Toaster />
								<SidebarLeft />
								{children}
								<LoginForm />
								<SignUpForm />
								<SidebarRight />
								<Player />
							</div>
						</body>
					</MusicProvider>
				</UserProvider>
			</AppProvider>
		</html>
	);
}
