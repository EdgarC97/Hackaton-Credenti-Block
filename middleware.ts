import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./app/lib/jwt";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("accessToken")?.value;
    const { pathname } = request.nextUrl;
  
    console.log("Token:", token);
    console.log("Pathname:", pathname);
  
    if (token) {
      const decoded = await verifyJwt(token);
  
      if (decoded) {
        if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
          console.log("Usuario autenticado, redirigiendo a /dashboard");
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      } else {
        console.log("Token inválido o expirado, redirigiendo a /login");
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("accessToken");
        return response;
      }
    } else {
      if (pathname.startsWith("/dashboard")) {
        console.log("Usuario no autenticado, redirigiendo a /login");
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  
    return NextResponse.next();
  }
  