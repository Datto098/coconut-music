import connect from '@/src/database/config';
import Music from '@/src/models/musicModel';
import {NextRequest, NextResponse} from 'next/server';

connect();
export const dynamic = 'force-dynamic';
export async function POST(request: NextRequest) {
	try {
		const reqbody = await request.json();
		const {searchValue} = reqbody;
		const limit = 20;

		const music = await Music.find({$text: {$search: searchValue}}).limit(limit);
		return NextResponse.json({message: 'Tìm thành công', success: true, data: music}, {status: 201});
	} catch (error: any) {
		return NextResponse.json({message: error.message, success: false}, {status: 201});
	}
}
