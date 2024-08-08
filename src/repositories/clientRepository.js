// src/repositories/clientRepository.js
const Client = require('../models/client');

class ClientRepository {
  async createClient(clientData) {
    return Client.create(clientData);
  }

  async findClientById(id) {
    return Client.findByPk(id);
  }

  async findAllClients() {
    return Client.findAll();
  }

  async updateClient(id, clientData) {
    return Client.update(clientData, {
      where: { id },
    });
  }

  async deleteClient(id) {
    return Client.destroy({
      where: { id },
    });
  }
}

module.exports = new ClientRepository();
