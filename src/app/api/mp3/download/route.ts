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

		// Set the Content-Disposition header
		const sanitizedTitle = videoTitle.replace(/[^\x00-\x7F]/g, '');
		const responseHeaders = {
			'Content-Disposition': `attachment; filename="${sanitizedTitle}.mp3"`,
		};

		// Send the response to the client
		const audioStream: any = ytdl(youtubeUrl, {filter: 'audioonly'});

		audioStream.on('progress', (chunkLength: any, downloaded: any, total: any) => {
			const percent = (downloaded / total) * 100;
			console.log(`Downloaded ${downloaded} bytes (${percent.toFixed(2)}%)`);
		});

		return new NextResponse(audioStream, {status: 201, headers: responseHeaders});
	} catch (error: any) {
		return NextResponse.json({message: error.message, success: false}, {status: 201});
	}
}
