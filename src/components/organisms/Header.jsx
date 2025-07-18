import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import ApperIcon from "@/components/ApperIcon";
import ThemeToggle from "@/components/molecules/ThemeToggle";
import Button from "@/components/atoms/Button";
import { AuthContext } from "@/App";

const Header = ({ onToggleSidebar }) => {
  const { logout } = useContext(AuthContext);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const user = useSelector((state) => state.user.user);

  const handleLogout = async () => {
    setShowUserMenu(false);
    await logout();
  };

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
          <div className="hidden md:flex items-center space-x-2 relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                {user?.firstName || 'User'}
              </span>
              <ApperIcon name="ChevronDown" className="w-4 h-4 text-surface-500" />
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 top-12 w-48 bg-white dark:bg-surface-800 rounded-lg shadow-lg border border-surface-200 dark:border-surface-700 z-50">
                <div className="p-3 border-b border-surface-200 dark:border-surface-700">
                  <p className="text-sm font-medium text-surface-900 dark:text-surface-100">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-surface-600 dark:text-surface-400">{user?.emailAddress}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-md transition-colors"
                  >
                    <ApperIcon name="LogOut" className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;