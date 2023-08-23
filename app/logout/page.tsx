'use client';
import Button from '@/components/button/button';
import {UserContext, UserContextType} from '@/context/user-context';
import {postData} from '@/helpers/axiosClient';
import {useRouter} from 'next/navigation';
import {useContext, useEffect, useState} from 'react';
import {toast} from 'react-hot-toast';

export default function LogoutPage(params: any) {
	const router = useRouter();
	const userContext = useContext(UserContext) as UserContextType;
	const {user, setUser} = userContext;
	const [isLogout, setIslogout] = useState(false);
	const handleLogout = async () => {
		try {
			const response = await postData('/api/users/logout', {});
			if (response.success) {
				toast.success(response.message);
				setIslogout(true);
				setUser({
					userId: '',
					username: '',
					email: '',
				});
			} else {
				toast.error(response.message);
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		if (user.userId !== '') {
			handleLogout();
		} else {
			router.push('/');
		}
	}, [user]);

	return (
		<div className='content-wrapper p-4 flex items-center justify-center'>
			{isLogout ? (
				<Button
					onClick={() => {}}
					primary
				>
					Trở về trang chủ
				</Button>
			) : (
				<h1 className='text-center text-white'>Đang xử lý</h1>
			)}
		</div>
	);
}
