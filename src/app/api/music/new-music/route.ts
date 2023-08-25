import connect from '@/src/database/config';
import Music from '@/src/models/musicModel';
import {NextRequest, NextResponse} from 'next/server';

connect();
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
	try {
		const limitParam = request.nextUrl.searchParams.get('_limit') as string;
		const limit = limitParam ? parseInt(limitParam, 10) : 12;
		const music = await Music.find({type: 'new-music'}).limit(limit);
		return NextResponse.json({message: 'Tải danh sách âm nhạc thành công', success: true, data: music}, {status: 201});
	} catch (error: any) {
		return NextResponse.json({message: error.message, success: false}, {status: 201});
	}
}
