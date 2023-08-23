import connect from '@/database/config';
import History from '@/models/historyModel';
import Music from '@/models/musicModel';
import {NextRequest, NextResponse} from 'next/server';

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const {songId, userId} = reqBody;
		const history = await History.findOne({song_id: songId, user_id: userId});

		// if song already exists in history
		if (history) {
			return NextResponse.json({message: 'Bài hát đã có trong lịch sử phát', success: false}, {status: 201});
		}

		const newHistory = new History({song_id: songId, user_id: userId});
		const saved = await newHistory.save();

		return NextResponse.json(
			{message: 'Đã thêm bài hát vào lịch sử phát thành công', success: true, data: saved},
			{status: 201}
		);
	} catch (error: any) {
		return NextResponse.json({message: error.message, success: false}, {status: 201});
	}
}

export async function GET(request: NextRequest) {
	try {
		const userId = request.nextUrl.searchParams.get('user_id') as string;
		const history = await History.find({user_id: userId});
		const musicPromises = history.map(async (his) => {
			try {
				const music = await Music.findOne({_id: his.song_id});
				return music;
			} catch (error) {
				console.error('Error fetching music:', error);
				return null;
			}
		});

		const musicResults: any = await Promise.all(musicPromises);
		const nonNullMusicResults = musicResults.filter((music: null) => music !== null);
		console.log('Final: ' + nonNullMusicResults.length);

		return NextResponse.json(
			{message: 'Tải lịch sử phát thành công', success: true, data: nonNullMusicResults},
			{status: 201}
		);
	} catch (error: any) {
		return NextResponse.json({message: error.message, success: false}, {status: 201});
	}
}
