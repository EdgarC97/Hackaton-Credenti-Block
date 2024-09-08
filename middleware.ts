import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./app/lib/jwt";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("accessToken")?.value;
    const { pathname } = request.nextUrl;
    if (token) {
      const decoded = await verifyJwt(token);
  
      if (decoded) {
        if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
          return NextResponse.redirect(new URL("/dashboard/admin", request.url));
        }
      } else {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("accessToken");
        return response;
      }
    } else {
      if (pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  
    return NextResponse.next();
  }
  