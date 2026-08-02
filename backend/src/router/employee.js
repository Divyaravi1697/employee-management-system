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
/**
 * @swagger
 * /api/employee/create:
 *   post:
 *     summary: Create a new employee
 *     tags:
 *       - Employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               department:
 *                 type: string
 *               salary:
 *                 type: number
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Invalid request
 */
router.post("/create", createEmployee);
/**
 * @swagger
 * /api/employee/get:
 *   get:
 *     summary: Get all employees
 *     tags:
 *       - Employee
 *     responses:
 *       200:
 *         description: Employee list
 */
router.get("/get", getEmployee);
/**
 * @swagger
 * /api/employee/update/{id}:
 *   put:
 *     summary: Update employee
 *     tags:
 *       - Employee
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee updated
 */
router.put("/update/:id", updateEmployee);
/**
 * @swagger
 * /api/employee/delete/{id}:
 *   delete:
 *     summary: Delete employee
 *     tags:
 *       - Employee
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee deleted
 */
router.delete("/delete/:id",deleteEmployee);

export default router;