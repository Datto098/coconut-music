import {CloseOutlined} from '@ant-design/icons';
import Button from '../button/button';
import Input from '../input/input';
import {useContext, useEffect, useState} from 'react';
import {AppContext, AppContextType} from '@/src/context/app-context';
import {postData} from '@/src/helpers/axiosClient';
import {toast} from 'react-hot-toast';

export default function SignUpForm(params: any) {
	const appContext = useContext(AppContext) as AppContextType;
	const {isActiveSignUpForm, setIsActiveLoginForm, setIsActiveSignUpForm} = appContext;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [isFetchingData, setIsFetchingData] = useState(false);

	// handle signup
	const handleSignup = async () => {
		try {
			setIsFetchingData(true);
			setDisabled(true);
			const response = await postData('/api/users/signup', {
				username: username,
				password: password,
				email: email,
			});
			if (response.success) {
				toast.success('Đăng ký thành công, vui lòng đăng nhập');
				setIsActiveSignUpForm(false);
				setIsActiveLoginForm(true);
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
		if (email.length > 0 && password.length > 0 && username.length > 0) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [email, password, username]);

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
					${isActiveSignUpForm ? 'opacity-[1] z-[10]' : 'opacity-[0] z-[-1]'}
					`}
			></div>
			<div
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
					${
						isActiveSignUpForm
							? 'translate-x-[-50%] translate-y-[-50%] opacity-[1]'
							: 'translate-x-[-250%] translate-y-[-250%] opacity-[0]'
					}
					`}
			>
				<div className='p-[40px]'>
					<Button
						onClick={() => {
							setIsActiveSignUpForm(false);
						}}
						className='absolute right-3 top-3'
						rounded
					>
						<CloseOutlined />
					</Button>
					<h3 className='text-center text-xl uppercase font-bold text-[var(--text-primary)]'>Đăng Ký</h3>
					<div>
						<div className='mb-4'>
							<Input
								placeholder='Nhập vào username ...'
								onChange={(e: any) => {
									setUsername(e.target.value);
								}}
								value={username}
								id='input-username'
								type='text'
								labelContent='Username'
							/>
						</div>
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
										handleSignup();
									}
								}}
								primary
								disabled={disabled}
								isHandling={isFetchingData}
							>
								Đăng Ký
							</Button>
							<Button
								onClick={() => {
									setIsActiveSignUpForm(false);
									setIsActiveLoginForm(true);
								}}
								link
								className='flex gap-1'
							>
								Đã có tài khoản ?
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
