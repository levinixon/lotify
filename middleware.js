import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req, NextRequest) {
	const token = await getToken({ req, secret: process.env.JWT_SECRET })

	const { pathname } = req.nextUrl

	if (pathname.startsWith("/_next")) return NextResponse.next();

	if (pathname.includes('/api/auth') || token) {
		return NextResponse.next()
	}

	if (!token && pathname !== '/login') {
		const loginUrl = new URL('/login', req.url)
		return NextResponse.rewrite(loginUrl)
	}
}





//export function middleware(request, NextRequest) {
  //const url = request.nextUrl.clone()
  //url.pathname = '/login'
  //return NextResponse.rewrite(url)