import connect from '@/database/config';
import Music from '@/models/musicModel';
import {NextRequest, NextResponse} from 'next/server';

connect();

export async function GET(request: NextRequest) {
	try {
		const music = await Music.find({type: 'new-music'});
		return NextResponse.json({message: 'Tải danh sách âm nhạc thành công', success: true, data: music}, {status: 201});
	} catch (error: any) {
		return NextResponse.json({message: error.message, success: false}, {status: 201});
	}
}
