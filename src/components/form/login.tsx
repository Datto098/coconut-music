'use client';
import {CloseOutlined, GoogleOutlined} from '@ant-design/icons';
import Button from '../button/button';
import Input from '../input/input';
import {useContext, useEffect, useState} from 'react';
import {AppContext, AppContextType} from '@/src/context/app-context';
import {postData} from '@/src/helpers/axiosClient';
import {toast} from 'react-hot-toast';
import {UserContext, UserContextType} from '@/src/context/user-context';
import {GoogleAuthProvider} from 'firebase/auth';
import {signInWithPopup, signOut} from 'firebase/auth';
import {auth} from '@/src/firebase/config';

export default function LoginForm(params: any) {
	const appContext = useContext(AppContext) as AppContextType;
	const {isActiveLoginForm, setIsActiveLoginForm, setIsActiveSignUpForm, theme} = appContext;
	const userContext = useContext(UserContext) as UserContextType;
	const {getUser, setUser} = userContext;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [isFetchingData, setIsFetchingData] = useState(false);

	// Sign in with google account
	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
		signInWithPopup(auth, provider)
			.then(async (result) => {
				const user = result.user;
				if (user.displayName && user.email && user.uid) {
					const response = await postData('/api/users/signup', {
						email: user.email,
						password: user.email,
						username: user.displayName,
					});
					if (response.success && response.message === 'Sign up successfully') {
						const response = await postData('/api/users/login', {
							email: user.email,
							password: user.email,
						});
					} else {
						const response = await postData('/api/users/login', {
							email: user.email,
							password: user.email,
						});
					}
					getUser();
					toast.success('Đăng nhập thành công');
					setIsActiveLoginForm(false);
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

	// logout google account
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

	// handle signup
	const handleLogin = async () => {
		try {
			setIsFetchingData(true);
			setDisabled(true);
			const response = await postData('/api/users/login', {
				email: email,
				password: password,
			});
			if (response.success) {
				toast.success('Đăng nhập thành công');
				setIsActiveSignUpForm(false);
				setIsActiveLoginForm(true);
				getUser();
				setIsActiveLoginForm(false);
			} else {
				toast.error(response.message);
			}
			setIsFetchingData(false);
			setDisabled(false);
		} catch (error: any) {
			console.log(error);
			toast.error(error.message);
		}
	};

	// destroy disabled button sign up
	useEffect(() => {
		if (email.length > 0 && password.length > 0) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [email, password]);

	return (
		<>
			<div
				className={`fixed
                    top-[0]
                    left-[0]
                    bottom-[0]
                    right-[0]
                    bg-[var(--brown-rgba)]
                    backdrop-filter
                    backdrop-blur-sm 
                    backdrop-contrast-100
					transition-all
					duration-500
					ease-linear
					${isActiveLoginForm ? 'opacity-[1] z-[10]' : 'opacity-[0] z-[-1]'}
					`}
			></div>
			<div
				data-theme={theme}
				className={`fixed
                    top-[50%]
                    left-[50%]
                    bg-[var(--brown)]
                    w-[640px]
                    rounded-xl
                    backdrop-filter
                    backdrop-grayscale 
                    backdrop-blur-md 
                    backdrop-contrast-200
					transition-all
					duration-500
					ease-linear
					z-[10]
					max-[840px]:w-[95%]
					${
						isActiveLoginForm
							? 'translate-x-[-50%] translate-y-[-50%] opacity-[1]'
							: 'translate-x-[-250%] translate-y-[-250%] opacity-[0]'
					}
					`}
			>
				<div className='p-[40px]'>
					<Button
						onClick={() => {
							setIsActiveLoginForm(false);
						}}
						className='absolute right-3 top-3'
						rounded
					>
						<CloseOutlined />
					</Button>
					<h3 className='text-center text-xl uppercase font-bold text-[var(--text-primary)]'>Đăng nhập</h3>
					<div>
						<div className='mb-4'>
							<Input
								placeholder='Nhập vào email ...'
								onChange={(e: any) => {
									setEmail(e.target.value);
								}}
								value={email}
								id='input-email'
								type='text'
								labelContent='Email'
							/>
						</div>
						<div className='mb-[30px]'>
							<Input
								placeholder='Nhập vào password ...'
								onChange={(e: any) => {
									setPassword(e.target.value);
								}}
								value={password}
								id='input-password'
								type='password'
								labelContent='Password'
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<Button
								onClick={() => {
									if (!disabled) {
										handleLogin();
									}
								}}
								primary
								disabled={disabled}
								isHandling={isFetchingData}
							>
								Đăng nhập
							</Button>
							<Button
								onClick={() => {
									signInWithGoogle();
								}}
								primary
								className='flex gap-1'
							>
								Đăng nhập với <GoogleOutlined />
							</Button>
							<Button
								onClick={() => {
									setIsActiveLoginForm(false);
									setIsActiveSignUpForm(true);
								}}
								link
								className='flex gap-1'
							>
								Chưa có tài khoản ?
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
// Redeploy
