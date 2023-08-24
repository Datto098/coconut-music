import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {getDataFromToken} from './helpers/getDataFromToken';
import User from './models/userModel';

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	const isPublicPath = path === '/';

	const token = request.cookies.get('token')?.value || '';

	if (!isPublicPath && !token) {
		return NextResponse.redirect(new URL('/', request.nextUrl));
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/', '/my-playlist', '/favorite', '/history', '/logout', '/dashboard/:path*'],
};
