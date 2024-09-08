import { Schema, model, models } from "mongoose";

const EmployeeSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true, // Crea los campos createdAt y updatedAt automáticamente
  }
);

const Employee = models.Employee || model("Employee", EmployeeSchema);

export default Employee;