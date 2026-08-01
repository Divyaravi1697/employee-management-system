import bcrypt from "bcrypt";
import employee from "../../model/employee.js";
const deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id;
      
        if (!id) {
            return res.status(404).json({ success: false, message: "Employee id not found" });
        }
        const existingEmployee = await employee.findById(id);
        if (!existingEmployee) {
            return res.status(400).json({ success: false, message: "Employee not found for this ID" });
        }
        const data = await employee.findByIdAndDelete(id);
        
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
export default deleteEmployee;