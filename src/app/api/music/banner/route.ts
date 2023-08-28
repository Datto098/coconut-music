import connect from '@/src/database/config';
import Banner from '@/src/models/bannerModel';
import {NextRequest, NextResponse} from 'next/server';

connect();
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const {bannerImage, bannerTitle} = reqBody;
		const banner = await Banner.findOne({image_src: bannerImage});

		// if banner image already exists
		if (banner) {
			return NextResponse.json({message: 'Banner đã tồn tại', success: false}, {status: 201});
		}

		const newBanner = new Banner({
			banner_title: bannerTitle,
			image_src: bannerImage,
		});

		const saved = await newBanner.save();

		return NextResponse.json({message: 'Đã thêm banner thành công', success: true, data: saved}, {status: 201});
	} catch (error: any) {
		return NextResponse.json({message: error.message, success: false}, {status: 201});
	}
}

export async function GET(request: NextRequest) {
	try {
		const banner = await Banner.find({active: true}).limit(4);
		return NextResponse.json({message: 'Tải danh sách banner thành công', success: true, data: banner}, {status: 201});
	} catch (error: any) {
		return NextResponse.json({message: error.message, success: false}, {status: 201});
	}
}
