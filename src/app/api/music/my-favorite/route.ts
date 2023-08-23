import connect from '@/src/database/config';
import Favorite from '@/src/models/favoriteModel';
import Music from '@/src/models/musicModel';
import {NextRequest, NextResponse} from 'next/server';

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const {songId, userId} = reqBody;
		const favorite = await Favorite.findOne({song_id: songId, user_id: userId});

		// if song already exists in history
		if (favorite) {
			return NextResponse.json({message: 'Bài hát đã có trong danh sách yêu thích', success: false}, {status: 201});
		}

		const newFavorite = new Favorite({song_id: songId, user_id: userId});
		const saved = await newFavorite.save();

		return NextResponse.json(
			{message: 'Đã thêm bài hát vào danh sách yêu thích thành công', success: true, data: saved},
			{status: 201}
		);
	} catch (error: any) {
		return NextResponse.json({message: error.message, success: false}, {status: 201});
	}
}

export async function GET(request: NextRequest) {
	try {
		const userId = request.nextUrl.searchParams.get('user_id') as string;
		const favorite = await Favorite.find({user_id: userId});
		const musicPromises = favorite.map(async (his) => {
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
			{message: 'Tải danh phát sách yêu thích thành công', success: true, data: nonNullMusicResults},
			{status: 201}
		);
	} catch (error: any) {
		return NextResponse.json({message: error.message, success: false}, {status: 201});
	}
}
