import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ message: 'Logout successful' });
  
    response.cookies.set('accessToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0, // Elimina la cookie
    });
  
    return response;
  }