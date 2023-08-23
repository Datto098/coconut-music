import connect from '@/database/config';
import Music from '@/models/musicModel';
import Playlist from '@/models/playlistModel';
import {NextRequest, NextResponse} from 'next/server';

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const {playListName, userId} = reqBody;
		const playlist = await Playlist.findOne({playlist_name: playListName, user_id: userId});

		// if song already exists in history
		if (playlist) {
			return NextResponse.json({message: 'Tên danh sách phát đã tồn tại', success: false}, {status: 201});
		}

		const newPlaylist = new Playlist({playlist_name: playListName, user_id: userId});
		const saved = await newPlaylist.save();

		return NextResponse.json(
			{message: 'Đã thêm danh sách phát mới thành công', success: true, data: saved},
			{status: 201}
		);
	} catch (error: any) {
		return NextResponse.json({message: error.message, success: false}, {status: 201});
	}
}

export async function GET(request: NextRequest) {
	try {
		const userId = request.nextUrl.searchParams.get('user_id') as string;
		const playlist = await Playlist.find({user_id: userId});

		return NextResponse.json({message: 'Tải danh sách phát thành công', success: true, data: playlist}, {status: 201});
	} catch (error: any) {
		return NextResponse.json({message: error.message, success: false}, {status: 201});
	}
}
