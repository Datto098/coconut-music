import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema(
	{
		user_id: {
			type: String,
			required: [true, 'Please provide a user id'],
		},
		playlist_name: {
			type: String,
			required: [true, 'Please provide a playlist name'],
			unique: true,
		},
		isPublic: {
			type: Boolean,
			default: false,
		},
	},
	{
		// Make Mongoose use Unix time (seconds since Jan 1, 1970)
		timestamps: {currentTime: () => Math.floor(Date.now() / 1000)},
	}
);

const Playlist = mongoose.models.playlist || mongoose.model('playlist', playlistSchema);
export default Playlist;
