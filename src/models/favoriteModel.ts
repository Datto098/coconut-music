import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
	{
		user_id: {
			type: String,
			required: [true, 'Please provide a user id'],
		},
		song_id: {
			type: String,
			required: [true, 'Please provide a song id'],
		},
	},
	{
		// Make Mongoose use Unix time (seconds since Jan 1, 1970)
		timestamps: {currentTime: () => Math.floor(Date.now() / 1000)},
	}
);

const Favorite = mongoose.models.favorites || mongoose.model('favorites', favoriteSchema);
export default Favorite;
