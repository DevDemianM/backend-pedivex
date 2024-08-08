// src/services/clientService.js
const clientRepository = require('../repositories/clientRepository');

class ClientService {
  async registerClient(clientData) {
    return clientRepository.createClient(clientData);
  }

  async getClientById(id) {
    return clientRepository.findClientById(id);
  }

  async getAllClients() {
    return clientRepository.findAllClients();
  }

  async updateClient(id, clientData) {
    return clientRepository.updateClient(id, clientData);
  }

  async deleteClient(id) {
    return clientRepository.deleteClient(id);
  }
}

module.exports = new ClientService();
