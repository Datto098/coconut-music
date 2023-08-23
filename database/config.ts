import mongoose from 'mongoose';

export default async function connect() {
	try {
		mongoose
			.connect(process.env.DB_URL!)
			.then(() => {
				console.log('Connected to database successfully');
			})
			.catch((err) => {
				console.log('Connect to database failed with error: ' + err);
			});
	} catch (error: any) {
		throw new Error(error.message);
	}
}
