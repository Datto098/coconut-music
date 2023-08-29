'use client';
import {menus} from '../../variables/menu';
import Link from 'next/link';
import {useContext, useEffect, useState} from 'react';
import {AppContext, AppContextType} from '@/src/context/app-context';
import {UserContext, UserContextType} from '@/src/context/user-context';
import {toast} from 'react-hot-toast';
import '../../styles/sidebar.css';
import {usePathname} from 'next/navigation';

export default function SidebarLeft(params: any) {
	const router = usePathname();
	const appContext = useContext(AppContext) as AppContextType;
	const {isActiveHeader, theme, isMobile, setIsActiveHeader} = appContext;

	const userContext = useContext(UserContext) as UserContextType;
	const {user} = userContext;

	const [pathname, setPathname] = useState('/');

	const checkUser = (currentItem: any) => {
		if (user.userId === '' && currentItem !== 0) {
			toast('Vui lòng đăng nhập trước', {
				icon: '🥺',
			});
		}
	};

	useEffect(() => {
		setPathname(router);
	}, [router]);

	return (
		<div
			data-theme={theme}
			className={`sidebar-left relative max-[1240px]:absolute max-[1240px]:top-0 max-[1240px]:left-0 max-[1240px]:bottom-0 max-[1240px]:z-10 min-w-[0] ${
				isActiveHeader ? 'min-w-[300px] max-[1240px]:min-w-[100%] mr-3' : 'mr-0 min-w-[-0]'
			}`}
		>
			<ul className='menu'>
				{menus.map((menu) => {
					return (
						<li
							className={`menu-item flex items-center text-lg rounded-e-xl overflow-hidden ${
								menu.link === pathname ? 'bg-[var(--purple)] text-[var(--background)]' : ''
							}`}
							key={menu.id}
						>
							<Link
								onClick={() => {
									checkUser(menu.id);
									if (isMobile) {
										setIsActiveHeader(false);
									}
								}}
								href={user.userId !== '' ? menu.link : '/'}
								className={`flex items-center gap-3 `}
							>
								{menu.icon}
								{menu.title}
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
