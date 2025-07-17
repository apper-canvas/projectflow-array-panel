import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ThemeToggle from "@/components/molecules/ThemeToggle";
import Button from "@/components/atoms/Button";

const Header = ({ onToggleSidebar }) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 px-4 lg:px-6"
    >
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden mr-2 p-2"
          >
            <ApperIcon name="Menu" className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Briefcase" className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold gradient-text">ProjectFlow</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="hidden md:flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center">
              <ApperIcon name="User" className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
              Freelancer
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;