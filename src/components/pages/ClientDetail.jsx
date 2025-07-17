import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { clientService } from "@/services/api/clientService";
import { projectService } from "@/services/api/projectService";

const EditClientModal = ({ isOpen, onClose, client, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    address: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || "",
        email: client.email || "",
        company: client.company || "",
        phone: client.phone || "",
        address: client.address || "",
        notes: client.notes || ""
      });
    }
  }, [client]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await clientService.update(client.Id, formData);
      toast.success("Client updated successfully!");
      onSuccess();
      onClose();
      setErrors({});
    } catch (error) {
      toast.error(error.message || "Failed to update client");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-surface-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-100">
              Edit Client
            </h2>
            <button
              onClick={handleClose}
              className="text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter client name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter company name"
                className={errors.company ? "border-red-500" : ""}
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">{errors.company}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address..."
                rows={2}
                className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 placeholder-surface-500 dark:placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Additional notes about the client..."
                rows={3}
                className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 placeholder-surface-500 dark:placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Save" className="w-4 h-4 mr-2" />
                    Update Client
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const ClientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  const loadClientData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [clientData, clientProjects, clientStats] = await Promise.all([
        clientService.getById(id),
        projectService.getByClientId(id),
        clientService.getClientStats(id)
      ]);
      
      setClient(clientData);
      setProjects(clientProjects);
      setStats(clientStats);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load client data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadClientData();
    }
  }, [id]);

  const handleBack = () => {
    navigate("/clients");
  };

  const handleEditSuccess = () => {
    loadClientData();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-400";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "planning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "on-hold":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-400";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-400";
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <Loading type="page" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Error message={error} onRetry={loadClientData} />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="p-6">
        <Empty
          icon="User"
          title="Client not found"
          description="The client you're looking for doesn't exist."
          actionText="Go Back"
          onAction={handleBack}
        />
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="p-2"
            >
              <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-100">
                {client.name}
              </h1>
              <p className="text-surface-600 dark:text-surface-400">
                {client.company}
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowEditModal(true)}
          >
            <ApperIcon name="Edit" className="w-4 h-4 mr-2" />
            Edit Client
          </Button>
        </div>

        {/* Client Info Card */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-2">
                Contact Information
              </h3>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                  <ApperIcon name="Mail" className="w-4 h-4 mr-2" />
                  {client.email}
                </div>
                {client.phone && (
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                    <ApperIcon name="Phone" className="w-4 h-4 mr-2" />
                    {client.phone}
                  </div>
                )}
                {client.address && (
                  <div className="flex items-start text-sm text-surface-600 dark:text-surface-400">
                    <ApperIcon name="MapPin" className="w-4 h-4 mr-2 mt-0.5" />
                    <span>{client.address}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-2">
                Status
              </h3>
              <span className={`px-3 py-1 text-sm rounded-full ${
                client.status === "active" 
                  ? "bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-400"
                  : "bg-surface-200 text-surface-700 dark:bg-surface-700 dark:text-surface-400"
              }`}>
                {client.status}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-2">
                Client Since
              </h3>
              <p className="text-sm text-surface-600 dark:text-surface-400">
                {new Date(client.joinDate).toLocaleDateString()}
              </p>
            </div>
            {client.notes && (
              <div>
                <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-2">
                  Notes
                </h3>
                <p className="text-sm text-surface-600 dark:text-surface-400">
                  {client.notes}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Quick Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    Total Projects
                  </p>
                  <p className="text-3xl font-bold text-surface-900 dark:text-surface-100">
                    {stats.totalProjects}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <ApperIcon name="FolderOpen" className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    Active Projects
                  </p>
                  <p className="text-3xl font-bold text-surface-900 dark:text-surface-100">
                    {stats.activeProjects}
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Activity" className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    Total Revenue
                  </p>
                  <p className="text-3xl font-bold text-surface-900 dark:text-surface-100">
                    ${stats.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center">
                  <ApperIcon name="DollarSign" className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Projects List */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-100">
              Projects
            </h2>
            <Button
              variant="outline"
              onClick={() => navigate("/projects")}
            >
              View All Projects
            </Button>
          </div>

          {projects.length === 0 ? (
            <Empty
              icon="FolderOpen"
              title="No projects yet"
              description="This client doesn't have any projects assigned."
              actionText="Create Project"
              onAction={() => navigate("/projects")}
            />
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <motion.div
                  key={project.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-surface-200 dark:border-surface-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-surface-900 dark:text-surface-100">
                          {project.name}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(project.priority)}`}>
                          {project.priority}
                        </span>
                      </div>
                      <p className="text-sm text-surface-600 dark:text-surface-400 mb-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-surface-600 dark:text-surface-400">
                        <div className="flex items-center">
                          <ApperIcon name="Calendar" className="w-4 h-4 mr-1" />
                          {new Date(project.startDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <ApperIcon name="Clock" className="w-4 h-4 mr-1" />
                          {new Date(project.deadline).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <ApperIcon name="DollarSign" className="w-4 h-4 mr-1" />
                          ${project.budget.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-sm font-medium text-surface-900 dark:text-surface-100">
                          {project.progress}%
                        </p>
                        <div className="w-20 bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                          <div
                            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/projects/${project.Id}`)}
                      >
                        <ApperIcon name="Eye" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>

      <EditClientModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        client={client}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default ClientDetail;