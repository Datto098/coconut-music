import {NextRequest, NextResponse} from 'next/server';
import ytdl from 'ytdl-core';

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
	try {
		const youtubeUrl = request.nextUrl.searchParams.get('url') as string;
		// Get information of video
		const info = await ytdl.getInfo(youtubeUrl);

		// Get name of video
		const videoTitle = info.videoDetails.title;

		// Get video thumbnail
		const videoThumbnail = info.videoDetails.thumbnail.thumbnails[3].url;

		// Get link mp3
		let mp3Url = null;

		info.formats.map((format) => {
			if (format.mimeType?.includes('audio/mp4')) {
				mp3Url = format.url;
				return;
			}
		});

		if (!mp3Url || !videoTitle || !videoThumbnail) {
			return NextResponse.json({message: 'Không thể tải nhạc, vui lòng thử lại sau', success: false}, {status: 201});
		}

		const data = {
			mp3url: mp3Url,
			mp3title: videoTitle,
			thumbnail: videoThumbnail,
		};

		return NextResponse.json({message: 'Tải nhạc thành công', success: true, data: info}, {status: 201});
	} catch (error: any) {
		return NextResponse.json({message: error.message, success: false}, {status: 201});
	}
}
