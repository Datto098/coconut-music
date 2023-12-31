import connect from '@/src/database/config';
import Music from '@/src/models/musicModel';
import {NextRequest, NextResponse} from 'next/server';

connect();

export async function GET(request: NextRequest) {
	try {
		const url = new URL(request.url);
		const type = url.pathname.split('/').pop();

		const music = await Music.find({type: type});
		return NextResponse.json({message: 'Tải danh sách âm nhạc thành công', success: true, data: music}, {status: 201});
	} catch (error: any) {
		return NextResponse.json({message: error.message, success: false}, {status: 201});
	}
}
