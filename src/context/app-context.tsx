'use client';
import {createContext, useMemo, useState} from 'react';

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
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
export default function AppProvider(params: any) {
	const {children} = params;
	const [isActiveHeader, setIsActiveHeader] = useState<boolean>(false);
	const [isActivePlaylist, setIsActivePlaylist] = useState<boolean>(false);
	const [isActiveLoginForm, setIsActiveLoginForm] = useState<boolean>(false);
	const [isActiveSignUpForm, setIsActiveSignUpForm] = useState<boolean>(false);
	const [isActiveUploadForm, setIsActiveUploadForm] = useState<boolean>(false);
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
		]
	);
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}