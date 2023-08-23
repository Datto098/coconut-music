import axios from 'axios';

export const getData = async (url: string, callback: any) => {
	try {
		const response: any = await axios.get(url, {
			headers: {
				'Content-Type': 'text/plain;charset=utf-8',
			},
		});
		console.log(response);
		if (response.data.success) {
			callback(response.data.data);
		}
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const postData = async (url: string, data: any, header = {}) => {
	try {
		const response = await axios.post(url, data, header);
		console.log(response);
		return response.data;
	} catch (error: any) {
		console.log(error);
		throw new Error(error.message);
	}
};
