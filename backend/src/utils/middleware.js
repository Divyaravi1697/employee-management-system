import jwt from "jsonwebtoken";
import Employee from "../model/employee.js";

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.auth_token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing, login required",
            });
        }

        const decode = jwt.verify(token, process.env.Key);

        const user = await Employee.findById(decode.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export default protect;