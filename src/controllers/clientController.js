const clientService = require('../services/clientService');

class ClientController {
  async registerClient(req, res) {
    try {
      const newClient = await clientService.registerClient(req.body);
      res.status(201).json({ message: 'Client registered successfully', client: newClient });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getClientById(req, res) {
    try {
      const client = await clientService.getClientById(req.params.id);
      if (client) {
        res.json(client);
      } else {
        res.status(404).json({ error: 'Client not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllClients(req, res) {
    try {
      const clients = await clientService.getAllClients();
      res.json(clients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateClient(req, res) {
    try {
      const updatedClient = await clientService.updateClient(req.params.id, req.body);
      if (updatedClient[0] === 1) {
        res.json({ message: 'Client updated successfully' });
      } else {
        res.status(404).json({ error: 'Client not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteClient(req, res) {
    try {
      const result = await clientService.deleteClient(req.params.id);
      if (result) {
        res.json({ message: 'Client deleted successfully' });
      } else {
        res.status(404).json({ error: 'Client not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ClientController();
