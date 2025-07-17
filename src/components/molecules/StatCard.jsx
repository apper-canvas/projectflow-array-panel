import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StatCard = ({ title, value, icon, trend, trendValue, className, gradient = false }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Card className={cn(
        "p-6 hover:shadow-lg transition-all duration-300",
        gradient && "bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-primary-100 dark:border-primary-800/50",
        className
      )}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">
              {title}
            </p>
            <p className={cn(
              "text-3xl font-bold",
              gradient ? "gradient-text" : "text-surface-900 dark:text-surface-100"
            )}>
              {value}
            </p>
            {trend && (
              <div className="flex items-center mt-2">
                <ApperIcon
                  name={trend === "up" ? "TrendingUp" : "TrendingDown"}
                  className={cn(
                    "w-4 h-4 mr-1",
                    trend === "up" ? "text-accent-600" : "text-red-500"
                  )}
                />
                <span className={cn(
                  "text-sm font-medium",
                  trend === "up" ? "text-accent-600" : "text-red-500"
                )}>
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          <div className={cn(
            "p-3 rounded-lg",
            gradient 
              ? "bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-800/50 dark:to-secondary-800/50" 
              : "bg-surface-100 dark:bg-surface-700"
          )}>
            <ApperIcon 
              name={icon} 
              className={cn(
                "w-6 h-6",
                gradient ? "text-primary-600 dark:text-primary-400" : "text-surface-600 dark:text-surface-400"
              )}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;