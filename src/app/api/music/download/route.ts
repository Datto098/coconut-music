import {storage} from '@/src/firebase/config';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {NextRequest, NextResponse} from 'next/server';
import ytdl from 'ytdl-core';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
	try {
		// Get youtube url
		const youtubeUrl = request.nextUrl.searchParams.get('url') as string;

		// Get information of video
		const info = await ytdl.getInfo(youtubeUrl);
		// Get name of video
		const videoTitle = info.videoDetails.title;
		const sanitizedTitle = videoTitle.replace(/[^\x00-\x7F]/g, '');
		// Get thumbnail url
		const videoThumbnail = info.videoDetails.thumbnails[3].url;

		const audioStream: any = ytdl(youtubeUrl, {filter: 'audioonly'});
		const chunks: any[] = [];

		audioStream.on('data', (chunk: any) => {
			chunks.push(chunk);
		});

		const uploadPromise = new Promise(async (resolve, reject) => {
			audioStream.on('end', async () => {
				try {
					const audioDataUint8Array = new Uint8Array(Buffer.concat(chunks));
					const storageRef = ref(storage, `mp3/${sanitizedTitle}.mp3`);
					const uploadTask = uploadBytes(storageRef, audioDataUint8Array, {contentType: 'audio/mpeg'});

					await uploadTask;

					const downloadURL = await getDownloadURL(storageRef);

					resolve(downloadURL);
				} catch (uploadError: any) {
					reject(uploadError);
				}
			});

			audioStream.on('error', (error: any) => {
				reject(error);
			});
		});

		const downloadURL = await uploadPromise;

		return NextResponse.json(
			{
				message: 'Upload success',
				success: true,
				data: {
					videoTitle: videoTitle,
					thumbnail: videoThumbnail,
					link: downloadURL,
				},
			},
			{status: 201}
		);
	} catch (error: any) {
		return NextResponse.json({message: error.message, success: false}, {status: 500});
	}
}
