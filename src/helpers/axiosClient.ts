import axios from 'axios';
import {toast} from 'react-hot-toast';

// const randomCompare = () => {
// 	return Math.random() - 0.5;
// };

export const getData = async (url: string, callback: any) => {
	try {
		const response: any = await axios.get(url, {
			headers: {
				'Content-Type': 'text/plain;charset=utf-8',
			},
		});
		if (response.data.success) {
			// response.data.data.sort(randomCompare);
			callback(response.data.data);
		} else {
			toast.error(response.data.message);
		}
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const postData = async (url: string, data: any, header = {}) => {
	try {
		const response = await axios.post(url, data, header);
		// console.log(response);
		return response.data;
	} catch (error: any) {
		console.log(error);
		throw new Error(error.message);
	}
};
