import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
	{
		banner_title: {
			type: String,
			required: [true, 'Please provide a banner title'],
		},
		image_src: {
			type: String,
			required: [true, 'Please provide a image src'],
			unique: true,
		},
		active: {
			type: Boolean,
			default: true,
		},
	},
	{
		// Make Mongoose use Unix time (seconds since Jan 1, 1970)
		timestamps: {currentTime: () => Math.floor(Date.now() / 1000)},
	}
);

const Banner = mongoose.models.banners || mongoose.model('banners', bannerSchema);
export default Banner;
