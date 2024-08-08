// src/controllers/employeeController.js
const employeeService = require('../services/employeeService');

class EmployeeController {
    async registerEmployee(req, res) {
        try {
            const newEmployee = await employeeService.registerEmployee(req.body);
            res.status(201).json(newEmployee);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getEmployeeById(req, res) {
        try {
            const employee = await employeeService.getEmployeeById(req.params.id);
            if (employee) {
                res.json(employee);
            } else {
                res.status(404).json({ error: 'Employee not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllEmployees(req, res) {
        try {
            const employees = await employeeService.getAllEmployees();
            res.json(employees);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateEmployee(req, res) {
        try {
            const updatedEmployee = await employeeService.updateEmployee(req.params.id, req.body);
            if (updatedEmployee[0] === 1) {
                res.json({ message: 'Employee updated successfully' });
            } else {
                res.status(404).json({ error: 'Employee not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteEmployee(req, res) {
        try {
            const result = await employeeService.deleteEmployee(req.params.id);
            if (result) {
                res.json({ message: 'Employee deleted successfully' });
            } else {
                res.status(404).json({ error: 'Employee not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new EmployeeController();
