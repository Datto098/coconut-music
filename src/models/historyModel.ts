import mongoose from 'mongoose';

const historySchema = new mongoose.Schema(
	{
		user_id: {
			type: String,
			required: [true, 'Please provide a user id'],
		},
		song_id: {
			type: String,
			required: [true, 'Please provide a song id'],
			unique: true,
		},
	},
	{
		// Make Mongoose use Unix time (seconds since Jan 1, 1970)
		timestamps: {currentTime: () => Math.floor(Date.now() / 1000)},
	}
);

const History = mongoose.models.history || mongoose.model('history', historySchema);
export default History;
