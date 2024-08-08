// src/services/employeeService.js
const Employee = require('../models/employee');

class EmployeeService {
  async registerEmployee(data) {
    return await Employee.create(data);
  }

  async getEmployeeById(id) {
    return await Employee.findByPk(id);
  }

  async getAllEmployees() {
    return await Employee.findAll();
  }

  async updateEmployee(id, data) {
    return await Employee.update(data, {
      where: { id: id },
    });
  }

  async deleteEmployee(id) {
    const result = await Employee.destroy({
      where: { id: id },
    });
    return result > 0; // Devuelve true si se eliminó algún registro
  }
}

module.exports = new EmployeeService();
