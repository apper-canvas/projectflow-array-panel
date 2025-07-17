import projectsData from "@/services/mockData/projects.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let projects = [...projectsData];

export const projectService = {
  async getAll() {
    await delay(300);
    return [...projects];
  },

  async getById(id) {
    await delay(200);
    const project = projects.find(p => p.Id === parseInt(id));
    if (!project) {
      throw new Error("Project not found");
    }
    return { ...project };
  },

  async getByClientId(clientId) {
    await delay(250);
    return projects.filter(p => p.clientId === parseInt(clientId));
  },

  async create(projectData) {
    await delay(400);
    const newProject = {
      ...projectData,
      Id: Math.max(...projects.map(p => p.Id), 0) + 1,
      progress: 0,
      spent: 0,
      startDate: new Date().toISOString().split("T")[0]
    };
    projects.push(newProject);
    return { ...newProject };
  },

  async update(id, projectData) {
    await delay(350);
    const index = projects.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Project not found");
    }
    projects[index] = { ...projects[index], ...projectData };
    return { ...projects[index] };
  },

  async delete(id) {
    await delay(300);
    const index = projects.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Project not found");
    }
    projects.splice(index, 1);
    return true;
  }
};