import {NextRequest, NextResponse} from 'next/server';
import ytdl from 'ytdl-core';

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
	try {
		// Get youtube url
		const youtubeUrl = request.nextUrl.searchParams.get('url') as string;
		console.log(youtubeUrl);
		// Get information of video
		const info = await ytdl.getInfo(youtubeUrl);
		if (info) {
			// Get name of video
			const videoTitle = info.videoDetails.title;
			// Get thumbnail url
			const videoThumbnail = info.videoDetails.thumbnails[3].url;

			const data = {
				videoTitle: videoTitle,
				videoThumbnail: videoThumbnail,
			};
			return NextResponse.json(
				{
					message: 'Lấy dữ liệu thành công',
					success: true,
					data: data,
				},
				{status: 201}
			);
		}
	} catch (error: any) {
		return NextResponse.json({message: error.message, success: false}, {status: 201});
	}
}
