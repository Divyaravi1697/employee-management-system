import employee from "../../model/employee.js";
const getEmployee = async (req, res) => {
    try {
        let filter = {
            role: "employee",
        };
        // let user = req.user;
        const name = req.query.name;
        if (name) {
            filter.name = name;
        }
        
        const department = req.query.department;
        if (department) {
            filter.department = department;
        }
        const data = await employee.find(filter);
        if (data.length === 0) {
            return res.status(200).json({ success: false, message: "No employees found" });
        }
        res.status(200).json({ success: true, message: "Employees retrieved successfully", count: data.length, data: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
export default getEmployee;