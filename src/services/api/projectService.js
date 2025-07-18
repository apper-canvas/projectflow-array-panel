import { toast } from "react-toastify";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const projectService = {
  async getAll() {
    try {
      await delay(300);
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { "Name": "Name" } },
          { field: { "Name": "description_c" } },
          { field: { "Name": "status_c" } },
          { field: { "Name": "progress_c" } },
          { field: { "Name": "start_date_c" } },
          { field: { "Name": "deadline_c" } },
          { field: { "Name": "budget_c" } },
          { field: { "Name": "spent_c" } },
          { field: { "Name": "priority_c" } },
          { field: { "Name": "category_c" } },
          { field: { "Name": "client_id_c" } }
        ]
      };

      const response = await apperClient.fetchRecords('project_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data.map(project => ({
        Id: project.Id,
        name: project.Name,
        description: project.description_c,
        status: project.status_c,
        progress: project.progress_c || 0,
        startDate: project.start_date_c,
        deadline: project.deadline_c,
        budget: project.budget_c || 0,
        spent: project.spent_c || 0,
        priority: project.priority_c,
        category: project.category_c,
        clientId: project.client_id_c?.Id || project.client_id_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching projects:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error.message);
        throw error;
      }
    }
  },

  async getById(id) {
    try {
      await delay(200);
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { "Name": "Name" } },
          { field: { "Name": "description_c" } },
          { field: { "Name": "status_c" } },
          { field: { "Name": "progress_c" } },
          { field: { "Name": "start_date_c" } },
          { field: { "Name": "deadline_c" } },
          { field: { "Name": "budget_c" } },
          { field: { "Name": "spent_c" } },
          { field: { "Name": "priority_c" } },
          { field: { "Name": "category_c" } },
          { field: { "Name": "client_id_c" } }
        ]
      };

      const response = await apperClient.getRecordById('project_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      const project = response.data;
      return {
        Id: project.Id,
        name: project.Name,
        description: project.description_c,
        status: project.status_c,
        progress: project.progress_c || 0,
        startDate: project.start_date_c,
        deadline: project.deadline_c,
        budget: project.budget_c || 0,
        spent: project.spent_c || 0,
        priority: project.priority_c,
        category: project.category_c,
        clientId: project.client_id_c?.Id || project.client_id_c
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching project with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error.message);
        throw error;
      }
    }
  },

  async getByClientId(clientId) {
    try {
      await delay(250);
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { "Name": "Name" } },
          { field: { "Name": "description_c" } },
          { field: { "Name": "status_c" } },
          { field: { "Name": "progress_c" } },
          { field: { "Name": "start_date_c" } },
          { field: { "Name": "deadline_c" } },
          { field: { "Name": "budget_c" } },
          { field: { "Name": "spent_c" } },
          { field: { "Name": "priority_c" } },
          { field: { "Name": "category_c" } },
          { field: { "Name": "client_id_c" } }
        ],
        where: [
          {
            FieldName: "client_id_c",
            Operator: "EqualTo",
            Values: [parseInt(clientId)]
          }
        ]
      };

      const response = await apperClient.fetchRecords('project_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data.map(project => ({
        Id: project.Id,
        name: project.Name,
        description: project.description_c,
        status: project.status_c,
        progress: project.progress_c || 0,
        startDate: project.start_date_c,
        deadline: project.deadline_c,
        budget: project.budget_c || 0,
        spent: project.spent_c || 0,
        priority: project.priority_c,
        category: project.category_c,
        clientId: project.client_id_c?.Id || project.client_id_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching projects by client:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error.message);
        throw error;
      }
    }
  },

  async create(projectData) {
    try {
      await delay(400);
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: projectData.name,
          description_c: projectData.description,
          status_c: projectData.status,
          progress_c: 0,
          start_date_c: new Date().toISOString().split("T")[0],
          deadline_c: projectData.deadline,
          budget_c: projectData.budget,
          spent_c: 0,
          priority_c: projectData.priority,
          category_c: projectData.category,
          client_id_c: projectData.clientId
        }]
      };

      const response = await apperClient.createRecord('project_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create projects ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
          throw new Error("Failed to create project");
        }

        const createdProject = response.results[0].data;
        return {
          Id: createdProject.Id,
          name: createdProject.Name,
          description: createdProject.description_c,
          status: createdProject.status_c,
          progress: createdProject.progress_c || 0,
          startDate: createdProject.start_date_c,
          deadline: createdProject.deadline_c,
          budget: createdProject.budget_c || 0,
          spent: createdProject.spent_c || 0,
          priority: createdProject.priority_c,
          category: createdProject.category_c,
          clientId: createdProject.client_id_c?.Id || createdProject.client_id_c
        };
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating project:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error.message);
        throw error;
      }
    }
  },

  async update(id, projectData) {
    try {
      await delay(350);
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: parseInt(id),
          Name: projectData.name,
          description_c: projectData.description,
          status_c: projectData.status,
          progress_c: projectData.progress,
          deadline_c: projectData.deadline,
          budget_c: projectData.budget,
          spent_c: projectData.spent,
          priority_c: projectData.priority,
          category_c: projectData.category
        }]
      };

      const response = await apperClient.updateRecord('project_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update projects ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
          throw new Error("Failed to update project");
        }

        const updatedProject = response.results[0].data;
        return {
          Id: updatedProject.Id,
          name: updatedProject.Name,
          description: updatedProject.description_c,
          status: updatedProject.status_c,
          progress: updatedProject.progress_c || 0,
          startDate: updatedProject.start_date_c,
          deadline: updatedProject.deadline_c,
          budget: updatedProject.budget_c || 0,
          spent: updatedProject.spent_c || 0,
          priority: updatedProject.priority_c,
          category: updatedProject.category_c,
          clientId: updatedProject.client_id_c?.Id || updatedProject.client_id_c
        };
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating project:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error.message);
        throw error;
      }
    }
  },

  async delete(id) {
    try {
      await delay(300);
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('project_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete projects ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          throw new Error("Failed to delete project");
        }

        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting project:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error.message);
        throw error;
      }
    }
  }
};