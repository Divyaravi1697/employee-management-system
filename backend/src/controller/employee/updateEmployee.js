import bcrypt from "bcrypt";
import employee from "../../model/employee.js";
const updateEmployee = async (req, res) => {
    try {
        const { name, department, salary, phone, email, password, isActive } = req.body;
        const id = req.params.id;
        // Check if employeeId is provided
        if (!id) {
            return res.status(404).json({ success: false, message: "Employee ID Not found" });
        }
      const existingEmployee = await employee.findById(id);
        if (!existingEmployee) {
            return res.status(400).json({ success: false, message: "Employee not found for this ID" });
        }
        //hasing
        let hashedPassword = existingEmployee.password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        const data = await employee.findByIdAndUpdate( id, {
            name,
            department,
            salary,
            phone,
            email,
            password: hashedPassword,
            isActive,
        
        }, {
            new: true,
            runValidators: true,
         });
        res.status(200).json({ message: "Employee updated successfully", data: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
export default updateEmployee;