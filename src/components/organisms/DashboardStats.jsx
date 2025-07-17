import { motion } from "framer-motion";
import StatCard from "@/components/molecules/StatCard";

const DashboardStats = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-surface-100 dark:bg-surface-700 rounded-xl p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-surface-200 dark:bg-surface-600 rounded w-20 mb-2"></div>
                <div className="h-8 bg-surface-200 dark:bg-surface-600 rounded w-16 mb-2"></div>
                <div className="h-4 bg-surface-200 dark:bg-surface-600 rounded w-12"></div>
              </div>
              <div className="w-12 h-12 bg-surface-200 dark:bg-surface-600 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <StatCard
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            trendValue={stat.trendValue}
            gradient={index === 0}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;