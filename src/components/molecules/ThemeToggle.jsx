import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useTheme } from "@/hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="relative w-10 h-10 p-0 hover:bg-surface-100 dark:hover:bg-surface-700"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ApperIcon
          name={theme === "light" ? "Sun" : "Moon"}
          className="w-5 h-5 text-surface-600 dark:text-surface-400"
        />
      </motion.div>
    </Button>
  );
};

export default ThemeToggle;