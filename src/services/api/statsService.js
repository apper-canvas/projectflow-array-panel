import { clientService } from "./clientService";
import { projectService } from "./projectService";
import { taskService } from "./taskService";
import { invoiceService } from "./invoiceService";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const statsService = {
  async getDashboardStats() {
    try {
      await delay(400);
      
      const [clients, projects, tasks, invoices] = await Promise.all([
        clientService.getAll(),
        projectService.getAll(),
        taskService.getAll(),
        invoiceService.getAll()
      ]);

      const activeClients = clients.filter(c => c.status === "active").length;
      const activeProjects = projects.filter(p => p.status === "in-progress").length;
      const pendingTasks = tasks.filter(t => t.status === "pending" || t.status === "in-progress").length;
      const totalRevenue = invoices
        .filter(i => i.status === "paid")
        .reduce((sum, i) => sum + i.total, 0);

      return [
        {
          title: "Total Revenue",
          value: `$${totalRevenue.toLocaleString()}`,
          icon: "DollarSign",
          trend: "up",
          trendValue: "+12.5%"
        },
        {
          title: "Active Clients",
          value: activeClients.toString(),
          icon: "Users",
          trend: "up",
          trendValue: "+3"
        },
        {
          title: "Active Projects",
          value: activeProjects.toString(),
          icon: "FolderOpen",
          trend: "up",
          trendValue: "+2"
        },
        {
          title: "Pending Tasks",
          value: pendingTasks.toString(),
          icon: "CheckSquare",
          trend: "down",
          trendValue: "-5"
        }
      ];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching dashboard stats:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error.message);
        throw error;
      }
    }
  }
};