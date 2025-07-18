import { toast } from "react-toastify";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
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
          { field: { "Name": "title_c" } },
          { field: { "Name": "description_c" } },
          { field: { "Name": "status_c" } },
          { field: { "Name": "priority_c" } },
          { field: { "Name": "assignee_c" } },
          { field: { "Name": "due_date_c" } },
          { field: { "Name": "created_date_c" } },
          { field: { "Name": "completed_date_c" } },
          { field: { "Name": "estimated_hours_c" } },
          { field: { "Name": "actual_hours_c" } },
          { field: { "Name": "project_id_c" } }
        ]
      };

      const response = await apperClient.fetchRecords('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data.map(task => ({
        Id: task.Id,
        title: task.title_c || task.Name,
        description: task.description_c,
        status: task.status_c,
        priority: task.priority_c,
        assignee: task.assignee_c,
        dueDate: task.due_date_c,
        createdDate: task.created_date_c,
        completedDate: task.completed_date_c,
        estimatedHours: task.estimated_hours_c || 0,
        actualHours: task.actual_hours_c || 0,
        projectId: task.project_id_c?.Id || task.project_id_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
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
          { field: { "Name": "title_c" } },
          { field: { "Name": "description_c" } },
          { field: { "Name": "status_c" } },
          { field: { "Name": "priority_c" } },
          { field: { "Name": "assignee_c" } },
          { field: { "Name": "due_date_c" } },
          { field: { "Name": "created_date_c" } },
          { field: { "Name": "completed_date_c" } },
          { field: { "Name": "estimated_hours_c" } },
          { field: { "Name": "actual_hours_c" } },
          { field: { "Name": "project_id_c" } }
        ]
      };

      const response = await apperClient.getRecordById('task_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      const task = response.data;
      return {
        Id: task.Id,
        title: task.title_c || task.Name,
        description: task.description_c,
        status: task.status_c,
        priority: task.priority_c,
        assignee: task.assignee_c,
        dueDate: task.due_date_c,
        createdDate: task.created_date_c,
        completedDate: task.completed_date_c,
        estimatedHours: task.estimated_hours_c || 0,
        actualHours: task.actual_hours_c || 0,
        projectId: task.project_id_c?.Id || task.project_id_c
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error.message);
        throw error;
      }
    }
  },

  async getByProjectId(projectId) {
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
          { field: { "Name": "title_c" } },
          { field: { "Name": "description_c" } },
          { field: { "Name": "status_c" } },
          { field: { "Name": "priority_c" } },
          { field: { "Name": "assignee_c" } },
          { field: { "Name": "due_date_c" } },
          { field: { "Name": "created_date_c" } },
          { field: { "Name": "completed_date_c" } },
          { field: { "Name": "estimated_hours_c" } },
          { field: { "Name": "actual_hours_c" } },
          { field: { "Name": "project_id_c" } }
        ],
        where: [
          {
            FieldName: "project_id_c",
            Operator: "EqualTo",
            Values: [parseInt(projectId)]
          }
        ]
      };

      const response = await apperClient.fetchRecords('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data.map(task => ({
        Id: task.Id,
        title: task.title_c || task.Name,
        description: task.description_c,
        status: task.status_c,
        priority: task.priority_c,
        assignee: task.assignee_c,
        dueDate: task.due_date_c,
        createdDate: task.created_date_c,
        completedDate: task.completed_date_c,
        estimatedHours: task.estimated_hours_c || 0,
        actualHours: task.actual_hours_c || 0,
        projectId: task.project_id_c?.Id || task.project_id_c
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by project:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error.message);
        throw error;
      }
    }
  },

  async create(taskData) {
    try {
      await delay(400);
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: taskData.title,
          title_c: taskData.title,
          description_c: taskData.description,
          status_c: "pending",
          priority_c: taskData.priority,
          assignee_c: taskData.assignee,
          due_date_c: taskData.dueDate,
          created_date_c: new Date().toISOString().split("T")[0],
          estimated_hours_c: taskData.estimatedHours,
          actual_hours_c: 0,
          project_id_c: taskData.projectId || null
        }]
      };

      const response = await apperClient.createRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create tasks ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
          throw new Error("Failed to create task");
        }

        const createdTask = response.results[0].data;
        return {
          Id: createdTask.Id,
          title: createdTask.title_c || createdTask.Name,
          description: createdTask.description_c,
          status: createdTask.status_c,
          priority: createdTask.priority_c,
          assignee: createdTask.assignee_c,
          dueDate: createdTask.due_date_c,
          createdDate: createdTask.created_date_c,
          completedDate: createdTask.completed_date_c,
          estimatedHours: createdTask.estimated_hours_c || 0,
          actualHours: createdTask.actual_hours_c || 0,
          projectId: createdTask.project_id_c?.Id || createdTask.project_id_c
        };
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error.message);
        throw error;
      }
    }
  },

  async update(id, taskData) {
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
          Name: taskData.title,
          title_c: taskData.title,
          description_c: taskData.description,
          status_c: taskData.status,
          priority_c: taskData.priority,
          assignee_c: taskData.assignee,
          due_date_c: taskData.dueDate,
          estimated_hours_c: taskData.estimatedHours,
          actual_hours_c: taskData.actualHours,
          completed_date_c: taskData.completedDate
        }]
      };

      const response = await apperClient.updateRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update tasks ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
          throw new Error("Failed to update task");
        }

        const updatedTask = response.results[0].data;
        return {
          Id: updatedTask.Id,
          title: updatedTask.title_c || updatedTask.Name,
          description: updatedTask.description_c,
          status: updatedTask.status_c,
          priority: updatedTask.priority_c,
          assignee: updatedTask.assignee_c,
          dueDate: updatedTask.due_date_c,
          createdDate: updatedTask.created_date_c,
          completedDate: updatedTask.completed_date_c,
          estimatedHours: updatedTask.estimated_hours_c || 0,
          actualHours: updatedTask.actual_hours_c || 0,
          projectId: updatedTask.project_id_c?.Id || updatedTask.project_id_c
        };
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
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

      const response = await apperClient.deleteRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete tasks ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          throw new Error("Failed to delete task");
        }

        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(error.message);
        throw error;
      }
    }
  }
};