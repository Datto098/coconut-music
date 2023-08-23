import connect from '@/database/config';
import User from '@/models/userModel';
import {NextRequest, NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const {email, password} = reqBody;

		// Find user
		const user = await User.findOne({
			email: email,
		});

		// If user not found
		if (!user) {
			return NextResponse.json({message: 'Tài khoản không tồn tại', success: false}, {status: 201});
		}

		// If user found
		console.log(user);

		// check password validation
		const validPassword = bcryptjs.compareSync(password, user.password);
		if (!validPassword) {
			return NextResponse.json({message: 'Mật khẩu không chính xác', success: false}, {status: 201});
		}

		console.log('validPassword: ' + JSON.stringify(validPassword));

		// create token data
		const tokenData = {
			id: user._id,
			username: user.username,
			email: user.email,
		};

		// create token
		const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'});
		const response = NextResponse.json({message: 'Đăng nhập thành công', success: true}, {status: 201});

		response.cookies.set('token', token, {httpOnly: true});
		return response;
	} catch (error: any) {
		return NextResponse.json({message: error.message, success: false}, {status: 201});
	}
}
