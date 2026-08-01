import express from "express";
import createEmployee from "../controller/employee/createEmployee.js";
import getEmployee from "../controller/employee/getEmployee.js";
import deleteEmployee from "../controller/employee/deleteEmployee.js";
import updateEmployee from "../controller/employee/updateEmployee.js";
import login from "../controller/auth/login.js";
import protect from "../utils/middleware.js";
import { allaccess } from "../utils/rolechecker.js";
import { admin } from "../utils/rolechecker.js";
const router = express.Router();

router.post("/create", createEmployee);
router.get("/get", getEmployee);
router.put("/update/:id", updateEmployee);
router.delete("/delete/:id",deleteEmployee);

export default router;