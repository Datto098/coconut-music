import Image from 'next/image';
import {useContext, useEffect, useState} from 'react';
import {AppContext, AppContextType} from '@/src/context/app-context';
import '../../styles/custom.css';
export default function LoadingPage(params: any) {
	const appContext = useContext(AppContext) as AppContextType;
	const {theme} = appContext;
	const [srcImage, setSrcImage] = useState('/coconut-logo-png-white.png');

	useEffect(() => {
		if (theme !== 'dark') {
			setSrcImage('/coconut-logo-png-black.png');
		} else {
			setSrcImage('/coconut-logo-png-white.png');
		}
	}, [theme]);

	return (
		<div
			className='loading'
			data-theme={theme}
		>
			<div className='loading-content'>
				<div className='logo'>
					<Image
						src={srcImage}
						alt='coconut mp3'
						width={100}
						height={100}
					/>
				</div>
				<div className='text-loading'>Đang tải nhạc vui lòng chờ xíu 😙...</div>
			</div>
		</div>
	);
}
