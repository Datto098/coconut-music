import connect from '@/src/database/config';
import Music from '@/src/models/musicModel';
import {writeFile} from 'fs/promises';
import {NextRequest, NextResponse} from 'next/server';
import fs from 'fs';
import util from 'util';

const stat = util.promisify(fs.stat);
const mkdir = util.promisify(fs.mkdir);

connect();

export async function POST(request: NextRequest, response: NextResponse) {
	const data = await request.formData();
	const fileMp3: File | null = data.get('fileMp3') as unknown as File;
	const fileImg: File | null = data.get('fileImg') as unknown as File;
	const musicName: string | null = data.get('musicName') as unknown as string;
	const category: string | null = data.get('category') as unknown as string;
	const singerName: string | null = data.get('singerName') as unknown as string;
	const type: string | null = data.get('type') as unknown as string;
	const timeFormat: string | null = data.get('timeFormat') as unknown as string;

	// Check files empty
	if (!fileMp3 || !fileImg) {
		return NextResponse.json(
			{message: 'Tệp hình ảnh hoặc tệp âm thanh không được cung cấp', success: false},
			{status: 201}
		);
	}

	// Check empty fields
	if (!musicName || !singerName || !category || !timeFormat || !type) {
		return NextResponse.json({message: 'Không được bỏ trống các field', success: false}, {status: 201});
	}

	// Get file path
	const musicSrc = await uploadFile(fileMp3, 'mp3');
	const imageMusic = await uploadFile(fileImg, 'img');

	// Check if the music already exists
	const music = await Music.findOne({musicSrc: musicSrc});
	if (music) {
		return NextResponse.json({message: 'Tệp bị trùng, bài hát đã tồn tại', success: false}, {status: 201});
	}

	const newMusic = new Music({
		name_music: musicName,
		category: category,
		name_singer: singerName,
		src_music: musicSrc,
		image_music: imageMusic,
		time_format: timeFormat,
		type: type,
	});
	const uploaded = await newMusic.save();
	return NextResponse.json({message: 'Tải nhạc lên thành công', success: true, data: uploaded}, {status: 201});
}

const uploadFile = async (file: File, type: string) => {
	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);

	let folderName = '';

	if (type === 'mp3') {
		folderName = 'mp3';
	} else if (type === 'img') {
		folderName = 'img';
	}

	// !!! use this when you debug on the localhost
	// Define the folder path
	// const folderPath = `./public/data-upload/${folderName}`;
	// Define the file path within the folder
	// const filePath = `${folderPath}/${file.name}`;
	// const pathTxt = filePath.replace(/^\.\/public/, '').replace(/\\/g, '/');

	// !!! use this when you deploy to vercel
	const folderPath = `data-upload/${folderName}`;
	const filePath = `${folderPath}/${file.name}`;
	const pathTxt = `/data-upload/${folderName}/${file.name}`;

	// try {
	// 	// Ensure that the folder exists
	// 	await fs.promises.mkdir(folderPath, {recursive: true});
	// } catch (error) {
	// 	// Folder may already exist, ignore error
	// }

	// Write the file to the specified path
	console.log(filePath);
	await writeFile(filePath, buffer);
	console.log(`File saved at: ${filePath}`);
	return pathTxt;
};
