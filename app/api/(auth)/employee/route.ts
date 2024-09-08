import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/app/lib/jwt";
import Employee from "@/app/lib/models/employee";

export async function POST(req: NextRequest) {
  try {
    // Obtener el token de las cookies
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Verificar el token JWT y obtener los datos del usuario
    const decoded = await verifyJwt(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded._id; // Obtener el ID del usuario del token decodificado

    // Validar el cuerpo de la solicitud
    const body = await req.json();
    const { name, email, address } = body;

    if (!name || !email || !address) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Verificar si ya existe un empleado con el mismo email
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return NextResponse.json({ error: "Employee with this email already exists" }, { status: 409 });
    }

    // Crear el nuevo empleado
    const newEmployee = new Employee({
      name,
      email,
      address,
      user: userId, // Relacionar el empleado con el usuario
    });

    // Guardar el empleado en la base de datos
    await newEmployee.save();

    return NextResponse.json({ message: "Employee created successfully", employee: newEmployee }, { status: 201 });
  } catch (error) {
    console.error("Error creating employee:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function GET(req: NextRequest) {
  try {
    // Obtener el token de las cookies
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Verificar el token JWT y obtener los datos del usuario
    const decoded = await verifyJwt(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded._id; // Obtener el ID del usuario del token decodificado

    // Buscar todos los empleados asociados al userId
    const employees = await Employee.find({ user: userId });

    return NextResponse.json({ employees }, { status: 200 });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

