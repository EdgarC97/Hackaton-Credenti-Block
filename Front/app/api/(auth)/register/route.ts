import connect from "@/Front/app/lib/db";
import User from "@/Front/app/lib/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { registerSchema } from "@/Front/app/lib/zod";


export async function POST(request: Request) {
  try {
    await connect();
    const body = await request.json();
    const { email, password, name, walletHash, role } = registerSchema.parse(body);

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "The user already exists" },
        { status: 400 }
      );
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      walletHash,
      role: role || "USER",
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    console.log("Created User", newUser);

    return NextResponse.json(
      { message: "User successfully created" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en el registro:", error); // Agregar log de error
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Error desconocido en el registro" }, { status: 400 });
  }
}