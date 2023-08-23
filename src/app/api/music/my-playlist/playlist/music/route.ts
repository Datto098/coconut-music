import connect from '@/src/database/config';
import Music from '@/src/models/musicModel';
import Playlist from '@/src/models/playlistModel';

import {NextRequest, NextResponse} from 'next/server';

connect();

export async function GET(request: NextRequest) {
	try {
		const userId = request.nextUrl.searchParams.get('user_id') as string;
		const playlistId = request.nextUrl.searchParams.get('playlist_id') as string;

		const playlist = await Playlist.findOne({user_id: userId, _id: playlistId});
		const dataMusic = await Music.find({type: playlist._id});
		console.log(dataMusic);

		return NextResponse.json({message: 'Tải danh sách phát thành công', success: true, data: dataMusic}, {status: 201});
	} catch (error: any) {
		return NextResponse.json({message: error.message, success: false}, {status: 201});
	}
}
