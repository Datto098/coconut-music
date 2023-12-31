import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	const isPublicPath = path === '/' || path === '/mp3/download';
	const token = request.cookies.get('token')?.value || '';

	if (!isPublicPath && !token) {
		return NextResponse.redirect(new URL('/', request.nextUrl));
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/', '/my-playlist', '/my-favorite', '/history', '/logout', '/dashboard/:path*', '/mp3/:path*'],
};
