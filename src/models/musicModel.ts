import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema(
	{
		name_music: {
			type: String,
			required: [true, 'Please provide a music name'],
			unique: true,
		},
		category: {
			type: String,
			required: [true, 'Please provide category name'],
		},
		time_format: {
			type: String,
			required: [true, 'Please provide a time format'],
		},
		name_singer: {
			type: String,
			required: [true, 'Please provide singer name'],
		},
		type: {
			type: String,
			required: [true, 'Please provide a type'],
		},
		src_music: {
			type: String,
			required: [true, 'Please provide a src'],
		},
		image_music: {
			type: String,
			required: [true, 'Please provide image music'],
		},
	},
	{
		// Make Mongoose use Unix time (seconds since Jan 1, 1970)
		timestamps: {currentTime: () => Math.floor(Date.now() / 1000)},
	}
);

const Music = mongoose.models.music || mongoose.model('music', musicSchema);
export default Music;
