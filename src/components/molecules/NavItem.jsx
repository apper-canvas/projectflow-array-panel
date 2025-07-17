import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const NavItem = ({ to, icon, children, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
          "hover:bg-surface-100 hover:text-surface-900 dark:hover:bg-surface-700 dark:hover:text-surface-100",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
          isActive
            ? "bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 text-primary-700 dark:text-primary-300 border-l-4 border-primary-600 dark:border-primary-400"
            : "text-surface-600 dark:text-surface-400 border-l-4 border-transparent"
        )
      }
    >
      {({ isActive }) => (
        <motion.div
          className="flex items-center w-full"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <ApperIcon
            name={icon}
            className={cn(
              "w-5 h-5 mr-3 transition-colors duration-200",
              isActive ? "text-primary-600 dark:text-primary-400" : "text-surface-500 dark:text-surface-500"
            )}
          />
          {children}
        </motion.div>
      )}
    </NavLink>
  );
};

export default NavItem;