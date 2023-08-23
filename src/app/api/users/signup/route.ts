import connect from '@/src/database/config';
import User from '@/src/models/userModel';
import {NextRequest, NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const {email, password, username} = reqBody;

		// Find user
		const checkEmail = await User.findOne({
			email: email,
		});

		const checkUsername = await User.findOne({
			username: username,
		});

		// If user found
		// check email
		if (checkEmail) {
			return NextResponse.json({message: 'Email has been used', success: false}, {status: 201});
		} else {
			if (checkUsername) {
				return NextResponse.json({message: 'Username has been used', success: false}, {status: 201});
			}
		}

		// If user not found

		// hash password
		const salt = await bcryptjs.genSalt(10);
		const hashPassword = await bcryptjs.hash(password, salt);

		// create a new user
		const newUser = new User({
			username: username,
			password: hashPassword,
			email: email,
		});

		const savedUser = await newUser.save();

		const response = NextResponse.json(
			{message: 'Sign up successfully', success: true, data: savedUser},
			{status: 201}
		);
		return response;
	} catch (error: any) {
		return NextResponse.json({message: error.message, success: false}, {status: 201});
	}
}
