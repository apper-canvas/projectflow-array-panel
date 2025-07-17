import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Button from "@/components/atoms/Button";
import { taskService } from "@/services/api/taskService";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
    priority: "medium",
    estimatedHours: "",
    projectId: ""
  });

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const tasksData = await taskService.getAll();
      setTasks(tasksData);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
const handleOpenModal = () => {
    setIsModalOpen(true);
    setFormData({
      title: "",
      description: "",
      assignee: "",
      dueDate: "",
      priority: "medium",
      estimatedHours: "",
      projectId: ""
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      title: "",
      description: "",
      assignee: "",
      dueDate: "",
      priority: "medium",
      estimatedHours: "",
      projectId: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim() || !formData.assignee.trim() || !formData.dueDate || !formData.estimatedHours) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsCreating(true);
      await taskService.create({
        ...formData,
        estimatedHours: parseInt(formData.estimatedHours),
        projectId: formData.projectId ? parseInt(formData.projectId) : null
      });
      
      toast.success("Task created successfully!");
      handleCloseModal();
      loadTasks();
    } catch (err) {
      toast.error(err.message || "Failed to create task");
    } finally {
      setIsCreating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-400";
      case "in-progress":
        return "bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-surface-200 text-surface-700 dark:bg-surface-700 dark:text-surface-400";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 dark:text-red-400";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400";
      case "low":
        return "text-accent-600 dark:text-accent-400";
      default:
        return "text-surface-600 dark:text-surface-400";
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <Loading type="cards" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Error message={error} onRetry={loadTasks} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-100 mb-2">
              Tasks
            </h1>
            <p className="text-surface-600 dark:text-surface-400">
              Manage and track your project tasks and assignments.
            </p>
          </div>
<Button variant="primary" onClick={handleOpenModal}>
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-surface-200 dark:border-surface-700 rounded-lg bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </motion.div>

      {filteredTasks.length === 0 ? (
        <Empty
          icon="CheckSquare"
          title="No tasks found"
          description={searchTerm || statusFilter !== "all" ? "Try adjusting your search or filter." : "Create your first task to get started."}
          actionText="New Task"
          onAction={() => toast.info("New task functionality coming soon!")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -4 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                    {task.status.replace("-", " ")}
                  </span>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="AlertCircle" className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
                    <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-2">
                  {task.title}
                </h3>
                <p className="text-sm text-surface-600 dark:text-surface-400 mb-4 line-clamp-2">
                  {task.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                    <ApperIcon name="User" className="w-4 h-4 mr-2" />
                    {task.assignee}
                  </div>
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                    <ApperIcon name="Calendar" className="w-4 h-4 mr-2" />
                    Due {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                    <ApperIcon name="Clock" className="w-4 h-4 mr-2" />
                    {task.estimatedHours}h estimated
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <ApperIcon name="Eye" className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ApperIcon name="Edit" className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ApperIcon name="Trash2" className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
</div>
      )}

      {/* Create Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-surface-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-100">
                  Create New Task
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-surface-400 hover:text-surface-600 dark:text-surface-500 dark:hover:text-surface-300"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Task Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter task title"
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter task description"
                    className="w-full px-3 py-2 border border-surface-200 dark:border-surface-700 rounded-lg bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 resize-none"
                    rows="3"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="assignee">Assignee *</Label>
                  <Input
                    id="assignee"
                    name="assignee"
                    value={formData.assignee}
                    onChange={handleInputChange}
                    placeholder="Enter assignee name"
                    className="w-full"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dueDate">Due Date *</Label>
                    <Input
                      id="dueDate"
                      name="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-surface-200 dark:border-surface-700 rounded-lg bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="estimatedHours">Estimated Hours *</Label>
                    <Input
                      id="estimatedHours"
                      name="estimatedHours"
                      type="number"
                      min="1"
                      value={formData.estimatedHours}
                      onChange={handleInputChange}
                      placeholder="Hours"
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="projectId">Project ID</Label>
                    <Input
                      id="projectId"
                      name="projectId"
                      type="number"
                      value={formData.projectId}
                      onChange={handleInputChange}
                      placeholder="Optional"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseModal}
                    className="flex-1"
                    disabled={isCreating}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                    disabled={isCreating}
                  >
                    {isCreating ? (
                      <>
                        <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                        Create Task
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Tasks;