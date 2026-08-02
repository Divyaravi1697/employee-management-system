import bcrypt from "bcrypt";
import { sendEmail } from "../../config/nodemailer.js";
import employee from "../../model/employee.js";
const createEmployee = async (req, res) => {
    try {
        const { name,  department, salary, phone, email, password } = req.body;
        // Check if all required fields are provided
        if (!name  || !department || !salary || !phone || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
       // Check if email already exists
const existingEmployee = await employee.findOne({ email });

if (existingEmployee) {
    return res.status(400).json({
        success: false,
        message: "Email already exists",
    });
}
        // Generate Employee ID
        const lastEmployee = await employee.findOne().sort({ createdAt: -1 });

        let employeeId = "EMS001";

        if (lastEmployee) {
            const match = lastEmployee.employeeId.match(/\d+/);

            const lastId = match ? Number(match[0]) : 0;

            employeeId = `EMS${String(lastId + 1).padStart(3, "0")}`;
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new employee
        const newEmployee = new employee({
            name,
            employeeId,
            department,
            salary,
            phone,
            email,
            password: hashedPassword,
        });
        await newEmployee.save();
        //  await sendEmail(
        //     email,
        //     "Manager Account Created",
        //     "Your manager account has been created successfully.",
        //     null,
        //     name,
        //      email,
        //     employeeId
            
         
        // );
        res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
    } catch (error) {
        console.error("Create Employee Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
export default createEmployee;