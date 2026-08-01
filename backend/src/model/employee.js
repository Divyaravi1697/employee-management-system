import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    employeeId: {
        type: String,
        required: true,
        unique: true,
    },
    department: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "employee"],
        default: "employee"    },
    isActive: {
        type: Boolean,
        default: true,
    },
    

}

, { timestamps: true }  );
export default mongoose.model("Employee", employeeSchema);