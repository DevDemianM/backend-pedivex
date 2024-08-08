// src/repositories/employeeRepository.js
const Employee = require('../models/employee');

class EmployeeRepository {
  async createEmployee(employeeData) {
    return Employee.create(employeeData);
  }

  async findEmployeeById(id) {
    return Employee.findByPk(id);
  }

  async findAllEmployees() {
    return Employee.findAll();
  }

  async updateEmployee(id, employeeData) {
    return Employee.update(employeeData, {
      where: { id },
    });
  }

  async deleteEmployee(id) {
    return Employee.destroy({
      where: { id },
    });
  }
}

module.exports = new EmployeeRepository();
