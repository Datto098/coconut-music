'use client';
import {postData} from '@/src/helpers/axiosClient';
import {UserProps} from '@/src/props/user-props';
import {onAuthStateChanged, signInWithPopup, signOut} from 'firebase/auth';
import {createContext, useEffect, useMemo, useState} from 'react';
import {toast} from 'react-hot-toast';
import {auth} from '../firebase/config';
import {GoogleAuthProvider} from 'firebase/auth';

export type UserContextType = {
	user: UserProps;
	setUser: React.Dispatch<React.SetStateAction<UserProps>>;
	getUser: () => void;
	signInWithGoogle: () => void;
	handleGoogleLogout: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
export default function UserProvider(params: any) {
	const {children} = params;
	const [user, setUser] = useState<UserProps>({
		userId: '',
		username: '',
		email: '',
		isSignInWithGoogle: false,
	});

	// google sign in
	useEffect(() => {
		const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
			console.log(currentUser);
			if (currentUser) {
				const {displayName, email, uid} = currentUser;
				if (displayName && email && uid) {
					setUser({
						userId: uid,
						email: email,
						username: displayName,
						isSignInWithGoogle: true,
					});
				}
			} else {
				setUser({
					userId: '',
					username: '',
					email: '',
					isSignInWithGoogle: false,
				});
			}
		});
		return () => {
			unsubcribe();
		};
	}, []);

	// Sign in with google account
	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
		signInWithPopup(auth, provider)
			.then((result) => {
				const user = result.user;
				if (user.displayName && user.email && user.uid) {
					setUser({
						username: user.displayName,
						email: user.email,
						userId: user.uid,
						isSignInWithGoogle: true,
					});
				}
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(`${errorCode}: ${errorMessage}`);
				// The email of the user's account used.
				const email = error.customData.email;
				console.log(email);
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				console.log(credential);
			});
	};

	const handleGoogleLogout = () => {
		signOut(auth)
			.then(() => {
				setUser({
					userId: '',
					username: '',
					email: '',
					isSignInWithGoogle: false,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getUser = async () => {
		try {
			const response = await postData('/api/users/me', {});
			if (response.success) {
				setUser({
					userId: response.data._id,
					username: response.data.username,
					email: response.data.email,
					isSignInWithGoogle: false,
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
			signInWithGoogle,
			handleGoogleLogout,
		}),
		[user, setUser]
	);
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
