import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const accessPath = path === '/' || path === '/logout' || path === '/dashboard';
	// const token = request.cookies.get('token')?.value || '';
	if (!accessPath) {
		return NextResponse.redirect(new URL('/404', request.nextUrl));
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/app/', '/app/logout', '/app/dashboard'],
};
