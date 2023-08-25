'use client';

import Image from 'next/image';
import {useContext, useState} from 'react';
import Input from '@/src/components/input/input';
import Button from '@/src/components/button/button';
import {AppContext, AppContextType} from '@/src/context/app-context';
import {UserContext, UserContextType} from '@/src/context/user-context';
import {Tooltip as ReactTooltip} from 'react-tooltip';
import {AppstoreOutlined, BellOutlined, BgColorsOutlined, UploadOutlined} from '@ant-design/icons';
import Link from 'next/link';
import '../../../styles/header.css';

export default function Header(params: any) {
	const [searchValue, setSearchValue] = useState('');
	const appContext = useContext(AppContext) as AppContextType;
	const {setIsActiveHeader, setIsActiveLoginForm, theme, setTheme} = appContext;
	const userContext = useContext(UserContext) as UserContextType;
	const {user} = userContext;

	return (
		<>
			<div
				className='header-wrapper'
				data-theme={theme}
			>
				<Button
					rounded
					onClick={() => {
						setIsActiveHeader((prev) => {
							return prev ? false : true;
						});
					}}
					className='mr-4'
				>
					<AppstoreOutlined />
				</Button>
				<div className='logo'>
					<Image
						src={theme === 'dark' ? '/coconut-logo.png' : '/coconut-logo-dark.png'}
						width={144}
						height={28}
						alt='Logo'
					/>
				</div>
				<div className='box-search flex-1 px-[90px]'>
					<Input
						placeholder='Tìm kiếm bài hát'
						type='text'
						id='input-search-song'
						onChange={(e: any) => {
							setSearchValue(e.target.value);
						}}
						value={searchValue}
						labelContent=''
						className='max-w-[460px] block'
					/>
				</div>
				<div className='other-action'>
					<div className='group-action'>
						<div className='action flex items-center gap-2'>
							<Button
								className=''
								rounded
								onClick={() => {
									setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
								}}
							>
								<BgColorsOutlined />
							</Button>
							<Button
								className=''
								rounded
								onClick={() => {}}
							>
								<BellOutlined />
							</Button>
							<div
								className='cursor-pointer'
								data-tooltip-id='my-tooltip-logout'
								id='my-tooltip-logout'
							>
								<Button
									primary
									onClick={() => {
										if (user.userId === '') {
											setIsActiveLoginForm(true);
										}
									}}
								>
									{user.userId ? user.username : 'Đăng nhập'}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
			{user.userId !== '' && (
				<ReactTooltip
					clickable
					id='my-tooltip-logout'
					place='bottom'
					style={{backgroundColor: 'var(--brown)', borderRadius: 8, color: 'var(--text-primary)'}}
					opacity='1'
					delayHide={100}
				>
					<Link href={'/logout'}>Đăng xuất</Link>
				</ReactTooltip>
			)}
		</>
	);
}
