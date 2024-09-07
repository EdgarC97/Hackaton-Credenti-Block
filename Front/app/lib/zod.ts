import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(), // Asegura que es un email válido
  password: z.string().min(6), // La contraseña debe tener al menos 6 caracteres
  name: z.string().optional(), // Nombre es opcional
  walletHash: z.string().min(1), // Hash de la wallet es requerido
  role: z.enum(["USER", "ADMIN"]).optional().default("USER"), // Role debe ser "USER" o "ADMIN" y es opcional
});

export const loginSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(1, "Password is required"),
 });

