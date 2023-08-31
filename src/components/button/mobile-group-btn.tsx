'use client';
import {BgColorsOutlined, ControlOutlined} from '@ant-design/icons';
import Button from './button';
import {AppContext, AppContextType} from '@/src/context/app-context';
import {useContext} from 'react';
export default function MobileButtonGroup(params: any) {
	const appContext = useContext(AppContext) as AppContextType;
	const {setTheme, setIsActivePlayer} = appContext;
	return (
		<div className='fixed bottom-[100px] right-2 translate-y-[-50%] p-2 bg-[var(--background)] shadow-lg rounded-xl'>
			<div className='flex flex-col gap-2 items-center justify-center'>
				<Button
					rounded
					onClick={() => {
						setIsActivePlayer((prev) => (prev === false ? true : false));
					}}
				>
					<ControlOutlined />
				</Button>
				<Button
					className=''
					rounded
					onClick={() => {
						setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
					}}
				>
					<BgColorsOutlined />
				</Button>
			</div>
		</div>
	);
}
