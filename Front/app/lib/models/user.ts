import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: null }, // Campo opcional
    walletHash: { type: String, unique: true }, // Campo único para la wallet
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" }, // Enum para los roles
  },
  {
    timestamps: true, // Crea los campos createdAt y updatedAt automáticamente
  }
);

const User = models.User || model("User", UserSchema);

export default User;