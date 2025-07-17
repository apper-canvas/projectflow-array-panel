import clientsData from "@/services/mockData/clients.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let clients = [...clientsData];

export const clientService = {
  async getAll() {
    await delay(300);
    return [...clients];
  },

  async getById(id) {
    await delay(200);
    const client = clients.find(c => c.Id === parseInt(id));
    if (!client) {
      throw new Error("Client not found");
    }
    return { ...client };
  },

  async create(clientData) {
    await delay(400);
    const newClient = {
      ...clientData,
      Id: Math.max(...clients.map(c => c.Id), 0) + 1,
      projectCount: 0,
      totalRevenue: 0,
      status: "active",
      joinDate: new Date().toISOString().split("T")[0]
    };
    clients.push(newClient);
    return { ...newClient };
  },

  async update(id, clientData) {
    await delay(350);
    const index = clients.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Client not found");
    }
    clients[index] = { ...clients[index], ...clientData };
    return { ...clients[index] };
  },

  async delete(id) {
    await delay(300);
    const index = clients.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Client not found");
    }
clients.splice(index, 1);
    return true;
  },

  async getClientStats(id) {
    await delay(200);
    const client = clients.find(c => c.Id === parseInt(id));
    if (!client) {
      throw new Error("Client not found");
    }
    
    // Import projects data to calculate stats
    const projectsData = await import("@/services/mockData/projects.json");
    const projects = projectsData.default;
    
    const clientProjects = projects.filter(p => p.clientId === parseInt(id));
    const activeProjects = clientProjects.filter(p => p.status === "in-progress" || p.status === "planning");
    const totalRevenue = clientProjects.reduce((sum, project) => sum + (project.budget || 0), 0);
    
    return {
      totalProjects: clientProjects.length,
      activeProjects: activeProjects.length,
      totalRevenue: totalRevenue
    };
  }
};