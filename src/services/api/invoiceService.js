import { toast } from "react-toastify";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const invoiceService = {
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
          { field: { "Name": "client_id_c" } },
          { field: { "Name": "project_id_c" } },
          { field: { "Name": "invoice_number_c" } },
          { field: { "Name": "amount_c" } },
          { field: { "Name": "tax_c" } },
          { field: { "Name": "total_c" } },
          { field: { "Name": "status_c" } },
          { field: { "Name": "issue_date_c" } },
          { field: { "Name": "due_date_c" } },
          { field: { "Name": "paid_date_c" } },
          { field: { "Name": "description_c" } }
        ]
      };

      const response = await apperClient.fetchRecords('app_invoice_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data.map(invoice => ({
        Id: invoice.Id,
        description: invoice.description_c || invoice.Name,
        clientId: invoice.client_id_c?.Id || invoice.client_id_c,
        projectId: invoice.project_id_c?.Id || invoice.project_id_c,
        invoiceNumber: invoice.invoice_number_c,
        amount: invoice.amount_c || 0,
        tax: invoice.tax_c || 0,
        total: invoice.total_c || 0,
        status: invoice.status_c,
        issueDate: invoice.issue_date_c,
        dueDate: invoice.due_date_c,
        paidDate: invoice.paid_date_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching invoices:", error?.response?.data?.message);
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
          { field: { "Name": "client_id_c" } },
          { field: { "Name": "project_id_c" } },
          { field: { "Name": "invoice_number_c" } },
          { field: { "Name": "amount_c" } },
          { field: { "Name": "tax_c" } },
          { field: { "Name": "total_c" } },
          { field: { "Name": "status_c" } },
          { field: { "Name": "issue_date_c" } },
          { field: { "Name": "due_date_c" } },
          { field: { "Name": "paid_date_c" } },
          { field: { "Name": "description_c" } }
        ]
      };

      const response = await apperClient.getRecordById('app_invoice_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      const invoice = response.data;
      return {
        Id: invoice.Id,
        description: invoice.description_c || invoice.Name,
        clientId: invoice.client_id_c?.Id || invoice.client_id_c,
        projectId: invoice.project_id_c?.Id || invoice.project_id_c,
        invoiceNumber: invoice.invoice_number_c,
        amount: invoice.amount_c || 0,
        tax: invoice.tax_c || 0,
        total: invoice.total_c || 0,
        status: invoice.status_c,
        issueDate: invoice.issue_date_c,
        dueDate: invoice.due_date_c,
        paidDate: invoice.paid_date_c
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching invoice with ID ${id}:`, error?.response?.data?.message);
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
          { field: { "Name": "client_id_c" } },
          { field: { "Name": "project_id_c" } },
          { field: { "Name": "invoice_number_c" } },
          { field: { "Name": "amount_c" } },
          { field: { "Name": "tax_c" } },
          { field: { "Name": "total_c" } },
          { field: { "Name": "status_c" } },
          { field: { "Name": "issue_date_c" } },
          { field: { "Name": "due_date_c" } },
          { field: { "Name": "paid_date_c" } },
          { field: { "Name": "description_c" } }
        ],
        where: [
          {
            FieldName: "client_id_c",
            Operator: "EqualTo",
            Values: [parseInt(clientId)]
          }
        ]
      };

      const response = await apperClient.fetchRecords('app_invoice_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data.map(invoice => ({
        Id: invoice.Id,
        description: invoice.description_c || invoice.Name,
        clientId: invoice.client_id_c?.Id || invoice.client_id_c,
        projectId: invoice.project_id_c?.Id || invoice.project_id_c,
        invoiceNumber: invoice.invoice_number_c,
        amount: invoice.amount_c || 0,
        tax: invoice.tax_c || 0,
        total: invoice.total_c || 0,
        status: invoice.status_c,
        issueDate: invoice.issue_date_c,
        dueDate: invoice.due_date_c,
        paidDate: invoice.paid_date_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching invoices by client:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error.message);
        throw error;
      }
    }
  },

  async create(invoiceData) {
    try {
      await delay(400);
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const invoiceNumber = `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`;
      
      const params = {
        records: [{
          Name: invoiceData.description,
          description_c: invoiceData.description,
          client_id_c: invoiceData.clientId,
          project_id_c: invoiceData.projectId || null,
          invoice_number_c: invoiceNumber,
          amount_c: invoiceData.amount,
          tax_c: invoiceData.tax,
          total_c: invoiceData.total,
          status_c: "draft",
          issue_date_c: new Date().toISOString().split("T")[0],
          due_date_c: invoiceData.dueDate
        }]
      };

      const response = await apperClient.createRecord('app_invoice_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create invoices ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
          throw new Error("Failed to create invoice");
        }

        const createdInvoice = response.results[0].data;
        return {
          Id: createdInvoice.Id,
          description: createdInvoice.description_c || createdInvoice.Name,
          clientId: createdInvoice.client_id_c?.Id || createdInvoice.client_id_c,
          projectId: createdInvoice.project_id_c?.Id || createdInvoice.project_id_c,
          invoiceNumber: createdInvoice.invoice_number_c,
          amount: createdInvoice.amount_c || 0,
          tax: createdInvoice.tax_c || 0,
          total: createdInvoice.total_c || 0,
          status: createdInvoice.status_c,
          issueDate: createdInvoice.issue_date_c,
          dueDate: createdInvoice.due_date_c,
          paidDate: createdInvoice.paid_date_c
        };
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating invoice:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error.message);
        throw error;
      }
    }
  },

  async update(id, invoiceData) {
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
          Name: invoiceData.description,
          description_c: invoiceData.description,
          amount_c: invoiceData.amount,
          tax_c: invoiceData.tax,
          total_c: invoiceData.total,
          status_c: invoiceData.status,
          due_date_c: invoiceData.dueDate,
          paid_date_c: invoiceData.paidDate
        }]
      };

      const response = await apperClient.updateRecord('app_invoice_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update invoices ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
          throw new Error("Failed to update invoice");
        }

        const updatedInvoice = response.results[0].data;
        return {
          Id: updatedInvoice.Id,
          description: updatedInvoice.description_c || updatedInvoice.Name,
          clientId: updatedInvoice.client_id_c?.Id || updatedInvoice.client_id_c,
          projectId: updatedInvoice.project_id_c?.Id || updatedInvoice.project_id_c,
          invoiceNumber: updatedInvoice.invoice_number_c,
          amount: updatedInvoice.amount_c || 0,
          tax: updatedInvoice.tax_c || 0,
          total: updatedInvoice.total_c || 0,
          status: updatedInvoice.status_c,
          issueDate: updatedInvoice.issue_date_c,
          dueDate: updatedInvoice.due_date_c,
          paidDate: updatedInvoice.paid_date_c
        };
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating invoice:", error?.response?.data?.message);
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

      const response = await apperClient.deleteRecord('app_invoice_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete invoices ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          throw new Error("Failed to delete invoice");
        }

        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting invoice:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error.message);
        throw error;
      }
    }
  }
};