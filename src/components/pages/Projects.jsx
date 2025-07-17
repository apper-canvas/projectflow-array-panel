import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { projectService } from "@/services/api/projectService";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    budget: "",
    deadline: "",
    priority: "medium",
    status: "planning"
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");
      const projectsData = await projectService.getAll();
      setProjects(projectsData);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
};

  const handleCreateProject = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = {};
    if (!formData.name.trim()) errors.name = "Project name is required";
    if (!formData.description.trim()) errors.description = "Description is required";
    if (!formData.category.trim()) errors.category = "Category is required";
    if (!formData.budget || isNaN(formData.budget) || parseFloat(formData.budget) <= 0) {
      errors.budget = "Valid budget amount is required";
    }
    if (!formData.deadline) errors.deadline = "Deadline is required";
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    try {
      setSubmitting(true);
      setFormErrors({});
      
      const projectData = {
        ...formData,
        budget: parseFloat(formData.budget),
        clientId: 1 // Default client for now
      };
      
      await projectService.create(projectData);
      toast.success("Project created successfully!");
      setShowModal(false);
      setFormData({
        name: "",
        description: "",
        category: "",
        budget: "",
        deadline: "",
        priority: "medium",
        status: "planning"
      });
      loadProjects();
    } catch (err) {
      toast.error("Failed to create project");
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-400";
      case "in-progress":
        return "bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400";
      case "planning":
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
        <Error message={error} onRetry={loadProjects} />
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
              Projects
            </h1>
            <p className="text-surface-600 dark:text-surface-400">
              Track progress and manage your project portfolio.
            </p>
          </div>
<Button variant="primary" onClick={() => setShowModal(true)}>
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="relative">
          <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {filteredProjects.length === 0 ? (
        <Empty
          icon="FolderOpen"
          title="No projects found"
description={searchTerm ? "Try adjusting your search terms." : "Create your first project to get started."}
          actionText="New Project"
          onAction={() => setShowModal(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -4 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                    {project.status.replace("-", " ")}
                  </span>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="AlertCircle" className={`w-4 h-4 ${getPriorityColor(project.priority)}`} />
                    <span className={`text-xs font-medium ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-2">
                  {project.name}
                </h3>
                <p className="text-sm text-surface-600 dark:text-surface-400 mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-surface-600 dark:text-surface-400">Progress</span>
                    <span className="font-medium text-surface-900 dark:text-surface-100">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-surface-600 dark:text-surface-400">Budget</span>
                    <span className="font-medium text-surface-900 dark:text-surface-100">
                      ${project.budget.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-surface-600 dark:text-surface-400">Spent</span>
                    <span className="font-medium text-surface-900 dark:text-surface-100">
                      ${project.spent.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                    <ApperIcon name="Calendar" className="w-4 h-4 mr-2" />
                    Due {new Date(project.deadline).toLocaleDateString()}
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

      {/* Create Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-surface-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-100">
                  Create New Project
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowModal(false)}
                  className="text-surface-400 hover:text-surface-600"
                >
                  <ApperIcon name="X" className="w-4 h-4" />
                </Button>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter project name"
                    className={formErrors.name ? "border-red-500" : ""}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter project description"
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md text-sm transition-colors ${
                      formErrors.description 
                        ? "border-red-500" 
                        : "border-surface-300 dark:border-surface-600"
                    } bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  />
                  {formErrors.description && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="e.g., Web Development, Design, Marketing"
                    className={formErrors.category ? "border-red-500" : ""}
                  />
                  {formErrors.category && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="budget">Budget ($)</Label>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="Enter budget amount"
                    min="0"
                    step="0.01"
                    className={formErrors.budget ? "border-red-500" : ""}
                  />
                  {formErrors.budget && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.budget}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className={formErrors.deadline ? "border-red-500" : ""}
                  />
                  {formErrors.deadline && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.deadline}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md text-sm bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md text-sm bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="planning">Planning</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                    className="flex-1"
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                        Create Project
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

export default Projects;