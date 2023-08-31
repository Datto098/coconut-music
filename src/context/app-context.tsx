'use client';
import {createContext, useEffect, useMemo, useState} from 'react';

export type AppContextType = {
	isActiveHeader: boolean;
	setIsActiveHeader: React.Dispatch<React.SetStateAction<boolean>>;
	isActivePlaylist: boolean;
	setIsActivePlaylist: React.Dispatch<React.SetStateAction<boolean>>;
	isActiveLoginForm: boolean;
	setIsActiveLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
	isActiveSignUpForm: boolean;
	setIsActiveSignUpForm: React.Dispatch<React.SetStateAction<boolean>>;
	isActiveLoadingPage: boolean;
	setIsActiveLoadingPage: React.Dispatch<React.SetStateAction<boolean>>;
	isActiveUploadForm: boolean;
	setIsActiveUploadForm: React.Dispatch<React.SetStateAction<boolean>>;
	isMobile: boolean;
	setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
	isActivePlayer: boolean;
	setIsActivePlayer: React.Dispatch<React.SetStateAction<boolean>>;
	theme: string;
	setTheme: React.Dispatch<React.SetStateAction<string>>;
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

const themeStorage = typeof window !== 'undefined' ? localStorage.getItem('theme') || undefined : undefined;

export default function AppProvider(params: any) {
	const {children} = params;
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const [isActiveLoginForm, setIsActiveLoginForm] = useState<boolean>(false);
	const [isActiveSignUpForm, setIsActiveSignUpForm] = useState<boolean>(false);
	const [isActiveUploadForm, setIsActiveUploadForm] = useState<boolean>(false);
	const [isActivePlaylist, setIsActivePlaylist] = useState<boolean>(false);
	const [isActivePlayer, setIsActivePlayer] = useState<boolean>(false);
	const [isActiveHeader, setIsActiveHeader] = useState<boolean>(true);
	const [theme, setTheme] = useState<string>(themeStorage || 'dark');
	const [searchValue, setSearchValue] = useState('');
	const [isActiveLoadingPage, setIsActiveLoadingPage] = useState(true);

	useEffect(() => {
		if (window.innerWidth <= 1240) {
			setIsMobile(true);
			setIsActiveHeader(false);
		}
		const timer = setTimeout(() => {
			setIsActiveLoadingPage(false);
		}, 3000);

		timer;

		return () => {
			clearTimeout(timer);
		};
	}, []);

	useEffect(() => {
		localStorage.setItem('theme', theme);
		document.querySelector('body')?.setAttribute('data-theme', theme);
	}, [theme]);

	const value = useMemo<AppContextType>(
		() => ({
			isActiveHeader,
			setIsActiveHeader,
			isActivePlaylist,
			setIsActivePlaylist,
			isActiveLoginForm,
			setIsActiveLoginForm,
			isActiveSignUpForm,
			setIsActiveSignUpForm,
			isActiveUploadForm,
			setIsActiveUploadForm,
			theme,
			setTheme,
			isMobile,
			setIsMobile,
			isActivePlayer,
			setIsActivePlayer,
			searchValue,
			setSearchValue,
			isActiveLoadingPage,
			setIsActiveLoadingPage,
		}),
		[
			isActiveHeader,
			setIsActiveHeader,
			isActivePlaylist,
			setIsActivePlaylist,
			isActiveLoginForm,
			setIsActiveLoginForm,
			isActiveSignUpForm,
			setIsActiveSignUpForm,
			isActiveUploadForm,
			setIsActiveUploadForm,
			theme,
			setTheme,
			isMobile,
			setIsMobile,
			isActivePlayer,
			setIsActivePlayer,
			searchValue,
			setSearchValue,
			isActiveLoadingPage,
			setIsActiveLoadingPage,
		]
	);
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
