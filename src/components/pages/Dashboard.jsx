import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import DashboardStats from "@/components/organisms/DashboardStats";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { statsService } from "@/services/api/statsService";

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStats = async () => {
    try {
      setLoading(true);
      setError("");
      const statsData = await statsService.getDashboardStats();
      setStats(statsData);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <Loading type="stats" />
        <Loading type="page" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Error message={error} onRetry={loadStats} />
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
        <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-100 mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-surface-600 dark:text-surface-400">
          Here's what's happening with your freelance business today.
        </p>
      </motion.div>

      <DashboardStats stats={stats} loading={loading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                Recent Activity
              </h3>
              <ApperIcon name="Activity" className="w-5 h-5 text-surface-500" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                <span className="text-sm text-surface-600 dark:text-surface-400">
                  Payment received from Tech Startup Inc - $9,265
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-sm text-surface-600 dark:text-surface-400">
                  Project "E-commerce Platform" updated to 65% complete
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                <span className="text-sm text-surface-600 dark:text-surface-400">
                  New task assigned: "Implement responsive navigation"
                </span>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-4">
              View All Activity
            </Button>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                Quick Actions
              </h3>
              <ApperIcon name="Zap" className="w-5 h-5 text-surface-500" />
            </div>
            <div className="space-y-3">
              <Button variant="primary" className="w-full justify-start">
                <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                Create New Project
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <ApperIcon name="FileText" className="w-4 h-4 mr-2" />
                Generate Invoice
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <ApperIcon name="UserPlus" className="w-4 h-4 mr-2" />
                Add New Client
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <ApperIcon name="CheckSquare" className="w-4 h-4 mr-2" />
                Create Task
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;