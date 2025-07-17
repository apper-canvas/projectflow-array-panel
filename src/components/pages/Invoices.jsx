import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { invoiceService } from "@/services/api/invoiceService";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    tax: "",
    dueDate: "",
    clientId: ""
  });
  const [formErrors, setFormErrors] = useState({});

const loadInvoices = async (showSuccessToast = false) => {
    try {
      setLoading(true);
      setError("");
      const invoicesData = await invoiceService.getAll();
      setInvoices(invoicesData);
      if (showSuccessToast) {
        toast.success("Invoice created successfully!");
      }
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load invoices");
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
    loadInvoices();
  }, []);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }
    
    if (!formData.amount || isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      errors.amount = "Valid amount is required";
    }
    
    if (!formData.tax || isNaN(parseFloat(formData.tax)) || parseFloat(formData.tax) < 0) {
      errors.tax = "Valid tax amount is required";
    }
    
    if (!formData.dueDate) {
      errors.dueDate = "Due date is required";
    } else {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.dueDate = "Due date cannot be in the past";
      }
    }
    
    if (!formData.clientId) {
      errors.clientId = "Client is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      const invoiceData = {
        description: formData.description.trim(),
        amount: parseFloat(formData.amount),
        tax: parseFloat(formData.tax),
        dueDate: formData.dueDate,
        clientId: parseInt(formData.clientId),
        total: parseFloat(formData.amount) + parseFloat(formData.tax)
      };
      
      await invoiceService.create(invoiceData);
      
      // Reset form and close modal
      setFormData({
        description: "",
        amount: "",
        tax: "",
        dueDate: "",
        clientId: ""
      });
      setFormErrors({});
      setShowModal(false);
      
      // Reload invoices with success message
      loadInvoices(true);
      
    } catch (err) {
      toast.error(err.message || "Failed to create invoice");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      description: "",
      amount: "",
      tax: "",
      dueDate: "",
      clientId: ""
    });
    setFormErrors({});
  };

  // Handle ESC key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && showModal) {
        handleCloseModal();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [showModal]);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "draft":
        return "bg-surface-200 text-surface-700 dark:bg-surface-700 dark:text-surface-400";
      default:
        return "bg-surface-200 text-surface-700 dark:bg-surface-700 dark:text-surface-400";
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
        <Error message={error} onRetry={loadInvoices} />
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
              Invoices
            </h1>
            <p className="text-surface-600 dark:text-surface-400">
              Manage billing and track payment status for your projects.
            </p>
          </div>
<Button variant="primary" onClick={() => setShowModal(true)}>
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            New Invoice
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
              placeholder="Search invoices..."
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
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </motion.div>

      {filteredInvoices.length === 0 ? (
        <Empty
          icon="FileText"
          title="No invoices found"
          description={searchTerm || statusFilter !== "all" ? "Try adjusting your search or filter." : "Create your first invoice to get started."}
          actionText="New Invoice"
          onAction={() => toast.info("New invoice functionality coming soon!")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvoices.map((invoice, index) => (
            <motion.div
              key={invoice.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -4 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-surface-900 dark:text-surface-100">
                    {invoice.invoiceNumber}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </div>
                
                <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-2">
                  {invoice.description}
                </h3>
                
                <div className="text-center py-4 mb-4">
                  <p className="text-3xl font-bold gradient-text">
                    ${invoice.total.toLocaleString()}
                  </p>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    Amount: ${invoice.amount.toLocaleString()} + Tax: ${invoice.tax.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-surface-600 dark:text-surface-400">Issue Date</span>
                    <span className="text-surface-900 dark:text-surface-100">
                      {new Date(invoice.issueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-surface-600 dark:text-surface-400">Due Date</span>
                    <span className="text-surface-900 dark:text-surface-100">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  {invoice.paidDate && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-surface-600 dark:text-surface-400">Paid Date</span>
                      <span className="text-accent-600 dark:text-accent-400">
                        {new Date(invoice.paidDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <ApperIcon name="Eye" className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ApperIcon name="Download" className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ApperIcon name="Edit" className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
</div>
      )}

      {/* Add Invoice Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-surface-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                  Create New Invoice
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-surface-400 hover:text-surface-600 dark:text-surface-500 dark:hover:text-surface-300 transition-colors"
                >
                  <ApperIcon name="X" className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Description *
                  </label>
                  <Input
                    type="text"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Enter invoice description"
                    className={formErrors.description ? "border-red-500" : ""}
                  />
                  {formErrors.description && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {formErrors.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Amount *
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.amount}
                      onChange={(e) => handleInputChange("amount", e.target.value)}
                      placeholder="0.00"
                      className={formErrors.amount ? "border-red-500" : ""}
                    />
                    {formErrors.amount && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {formErrors.amount}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Tax *
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.tax}
                      onChange={(e) => handleInputChange("tax", e.target.value)}
                      placeholder="0.00"
                      className={formErrors.tax ? "border-red-500" : ""}
                    />
                    {formErrors.tax && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {formErrors.tax}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Due Date *
                  </label>
                  <Input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleInputChange("dueDate", e.target.value)}
                    className={formErrors.dueDate ? "border-red-500" : ""}
                  />
                  {formErrors.dueDate && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {formErrors.dueDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Client ID *
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.clientId}
                    onChange={(e) => handleInputChange("clientId", e.target.value)}
                    placeholder="Enter client ID"
                    className={formErrors.clientId ? "border-red-500" : ""}
                  />
                  {formErrors.clientId && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {formErrors.clientId}
                    </p>
                  )}
                </div>

                {formData.amount && formData.tax && (
                  <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                        Total Amount:
                      </span>
                      <span className="text-lg font-bold text-surface-900 dark:text-surface-100">
                        ${(parseFloat(formData.amount || 0) + parseFloat(formData.tax || 0)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseModal}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
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
                        Create Invoice
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

export default Invoices;