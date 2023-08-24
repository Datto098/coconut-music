import connect from '@/src/database/config';
import User from '@/src/models/userModel';
import {NextRequest, NextResponse} from 'next/server';

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const {userId} = reqBody;

		// Find user
		const user = await User.findOne({
			_id: userId,
		});

		// If user not found
		if (!user) {
			return NextResponse.json({message: 'Tài khoản không tồn tại', success: false}, {status: 201});
		}

		// If user found
		console.log(user);

		if (!user.isAdmin) {
			return NextResponse.json({message: 'Kiểm tra thấy bại', success: false}, {status: 201});
		}

		return NextResponse.json({message: 'Kiểm tra thành công', success: true}, {status: 201});
	} catch (error: any) {
		return NextResponse.json({message: error.message, success: false}, {status: 201});
	}
}
