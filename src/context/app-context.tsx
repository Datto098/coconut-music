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
	isActiveUploadForm: boolean;
	setIsActiveUploadForm: React.Dispatch<React.SetStateAction<boolean>>;
	isMobile: boolean;
	setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
	isActivePlayer: boolean;
	setIsActivePlayer: React.Dispatch<React.SetStateAction<boolean>>;
	theme: string;
	setTheme: React.Dispatch<React.SetStateAction<string>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
export default function AppProvider(params: any) {
	const {children} = params;
	const [isActiveHeader, setIsActiveHeader] = useState<boolean>(false);
	const [isActivePlaylist, setIsActivePlaylist] = useState<boolean>(false);
	const [isActiveLoginForm, setIsActiveLoginForm] = useState<boolean>(false);
	const [isActiveSignUpForm, setIsActiveSignUpForm] = useState<boolean>(false);
	const [isActiveUploadForm, setIsActiveUploadForm] = useState<boolean>(false);
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const [isActivePlayer, setIsActivePlayer] = useState<boolean>(false);
	const [theme, setTheme] = useState<string>('light');

	useEffect(() => {
		if (window.innerWidth <= 1240) {
			setIsMobile(true);
		}
	}, []);

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
		]
	);
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
