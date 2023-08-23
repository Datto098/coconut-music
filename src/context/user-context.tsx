'use client';
import {postData} from '@/src/helpers/axiosClient';
import {UserProps} from '@/src/props/user-props';
import {createContext, useEffect, useMemo, useState} from 'react';
import {toast} from 'react-hot-toast';

export type UserContextType = {
	user: UserProps;
	setUser: React.Dispatch<React.SetStateAction<UserProps>>;
	getUser: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
export default function UserProvider(params: any) {
	const {children} = params;
	const [user, setUser] = useState<UserProps>({
		userId: '',
		username: '',
		email: '',
	});

	const getUser = async () => {
		try {
			const response = await postData('/api/users/me', {});
			if (response.success) {
				setUser({
					userId: response.data._id,
					username: response.data.username,
					email: response.data.email,
				});
				toast(`Welcome back ${response.data.username}!`, {
					icon: '👏',
				});
			} else {
				// console.log(response.message);
			}
		} catch (error: any) {
			// console.log(error.message);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	const value = useMemo<UserContextType>(
		() => ({
			user,
			setUser,
			getUser,
		}),
		[user, setUser]
	);
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
