import User from "@/app/lib/models/user";
import { loginSchema } from "@/app/lib/zod";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signJwtAccessToken, verifyJwt } from "@/app/lib/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });

    if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // const { password: _, ...userWithoutPass } = existingUser;
    // const accessToken = signJwtAccessToken(userWithoutPass);

     // Crear el payload para el JWT con el _id y el role
     const accessToken = signJwtAccessToken({
      _id: existingUser._id,
      role: existingUser.role,  // Incluir el rol si lo necesitas
    });

    // const response = NextResponse.json({ message: "Login successful" });
    const response = NextResponse.json({
      message: "Login successful",
      accessToken,
    });

    // Set cookie with HttpOnly and Secure flags
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1 hour, matching the JWT expiration
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Data invalid" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // Obtener el token de las cookies
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Verificar el token JWT
    const decoded = await verifyJwt(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Buscar el usuario en la base de datos
    const user = await User.findById(decoded._id).select('-password');

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Devolver la información del usuario
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}