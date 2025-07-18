import { toast } from "react-toastify";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const clientService = {
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
          { field: { "Name": "email_c" } },
          { field: { "Name": "company_c" } },
          { field: { "Name": "notes_c" } },
          { field: { "Name": "project_count_c" } },
          { field: { "Name": "total_revenue_c" } },
          { field: { "Name": "status_c" } },
          { field: { "Name": "phone_c" } },
          { field: { "Name": "address_c" } },
          { field: { "Name": "join_date_c" } }
        ]
      };

      const response = await apperClient.fetchRecords('client_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data.map(client => ({
        Id: client.Id,
        name: client.Name,
        email: client.email_c,
        company: client.company_c,
        notes: client.notes_c,
        projectCount: client.project_count_c || 0,
        totalRevenue: client.total_revenue_c || 0,
        status: client.status_c,
        phone: client.phone_c,
        address: client.address_c,
        joinDate: client.join_date_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching clients:", error?.response?.data?.message);
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
          { field: { "Name": "email_c" } },
          { field: { "Name": "company_c" } },
          { field: { "Name": "notes_c" } },
          { field: { "Name": "project_count_c" } },
          { field: { "Name": "total_revenue_c" } },
          { field: { "Name": "status_c" } },
          { field: { "Name": "phone_c" } },
          { field: { "Name": "address_c" } },
          { field: { "Name": "join_date_c" } }
        ]
      };

      const response = await apperClient.getRecordById('client_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      const client = response.data;
      return {
        Id: client.Id,
        name: client.Name,
        email: client.email_c,
        company: client.company_c,
        notes: client.notes_c,
        projectCount: client.project_count_c || 0,
        totalRevenue: client.total_revenue_c || 0,
        status: client.status_c,
        phone: client.phone_c,
        address: client.address_c,
        joinDate: client.join_date_c
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching client with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error.message);
        throw error;
      }
    }
  },

  async create(clientData) {
    try {
      await delay(400);
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: clientData.name,
          email_c: clientData.email,
          company_c: clientData.company,
          notes_c: clientData.notes || "",
          project_count_c: 0,
          total_revenue_c: 0,
          status_c: "active",
          phone_c: clientData.phone || "",
          address_c: clientData.address || "",
          join_date_c: new Date().toISOString().split("T")[0]
        }]
      };

      const response = await apperClient.createRecord('client_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create clients ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
          throw new Error("Failed to create client");
        }

        const createdClient = response.results[0].data;
        return {
          Id: createdClient.Id,
          name: createdClient.Name,
          email: createdClient.email_c,
          company: createdClient.company_c,
          notes: createdClient.notes_c,
          projectCount: createdClient.project_count_c || 0,
          totalRevenue: createdClient.total_revenue_c || 0,
          status: createdClient.status_c,
          phone: createdClient.phone_c,
          address: createdClient.address_c,
          joinDate: createdClient.join_date_c
        };
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating client:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error.message);
        throw error;
      }
    }
  },

  async update(id, clientData) {
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
          Name: clientData.name,
          email_c: clientData.email,
          company_c: clientData.company,
          notes_c: clientData.notes || "",
          phone_c: clientData.phone || "",
          address_c: clientData.address || ""
        }]
      };

      const response = await apperClient.updateRecord('client_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update clients ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
          throw new Error("Failed to update client");
        }

        const updatedClient = response.results[0].data;
        return {
          Id: updatedClient.Id,
          name: updatedClient.Name,
          email: updatedClient.email_c,
          company: updatedClient.company_c,
          notes: updatedClient.notes_c,
          projectCount: updatedClient.project_count_c || 0,
          totalRevenue: updatedClient.total_revenue_c || 0,
          status: updatedClient.status_c,
          phone: updatedClient.phone_c,
          address: updatedClient.address_c,
          joinDate: updatedClient.join_date_c
        };
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating client:", error?.response?.data?.message);
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

      const response = await apperClient.deleteRecord('client_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete clients ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          throw new Error("Failed to delete client");
        }

        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting client:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error.message);
        throw error;
      }
    }
  },

  async getClientStats(id) {
    try {
      await delay(200);
      // This would need to be implemented with aggregator queries
      // For now, return default stats
      return {
        totalProjects: 0,
        activeProjects: 0,
        totalRevenue: 0
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching client stats:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error.message);
        throw error;
      }
    }
  }
};