import Employee from "../../model/employee.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }
        const employee = await Employee.findOne({ email });

        if (!employee) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        // Check employee status
        if (
            employee.role === "employee" &&
            !employee.isActive
        ) {
            return res.status(403).json({
                success: false,
                message: "Your account is inactive. Please contact the administrator.",
            });
        }
    
        if (!employee) {
            return res.status(400).json({ success: false, message: "User not found for this email" });
        }

        const isMatched = await bcrypt.compare(password, employee.password);
        if (!isMatched) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }


        const token = jwt.sign({
            id: employee._id,
            
            email: employee.email,
            role: employee.role,
        }, process.env.Key, { expiresIn: "1h" });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000, // 1 hour
        });


        res.status(200).json({
            success: true, message: "Login successful", token,
            role: employee.role,
            user: {
                id: employee._id,
                employeeId: employee.employeeId,
                name: employee.name,
                department: employee.department,
                phone: employee.phone,
                email: employee.email,
                isActive: employee.isActive,
                role: employee.role,
            }, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
export default login;