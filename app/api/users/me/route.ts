import connect from '@/database/config';
import {getDataFromToken} from '@/helpers/getDataFromToken';
import User from '@/models/userModel';
import {NextRequest, NextResponse} from 'next/server';

connect();

export async function POST(request: NextRequest) {
	try {
		const userId = getDataFromToken(request);
		const user = await User.findOne({_id: userId}).select('-password');

		return NextResponse.json(
			{
				message: 'User found',
				success: true,
				data: user,
			},
			{status: 201}
		);
	} catch (error: any) {
		return NextResponse.json(
			{
				message: 'User not found',
				success: false,
			},
			{status: 201}
		);
	}
}
